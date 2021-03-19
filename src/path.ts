export type Path = Navigator[]

export type Navigator = PropNavigator | IndexNavigator | SliceNavigator

export type PropNavigator = [NavigatorType.Prop, string | symbol]
export type IndexNavigator = [NavigatorType.Index, number]
export type SliceNavigator = [NavigatorType.Slice, number, number]

export const enum NavigatorType {
  Root,
  Prop,
  Index,
  Slice,
}

export type Access = RootAccess | PropAccess | IndexAccess

export type RootAccess = { type: NavigatorType.Root, parent: undefined, key: undefined, value: any }
export type PropAccess = { type: NavigatorType.Prop, parent: Access, key: string | symbol, value: any }
export type IndexAccess = { type: NavigatorType.Index, parent: Access, key: number, value: any }

export function read(path: Path, root: any): Access[][] {
  const accesses: Access[][] = Array(path.length + 1)

  accesses[0] = [{ type: NavigatorType.Root, parent: undefined, key: undefined, value: root }]

  for (let i = 0; i < path.length; i++) {
    const step = path[i]

    switch (step[0]) {
      case NavigatorType.Prop:
        accesses[i + 1] = accesses[i].map((parent) => ({
          type: NavigatorType.Prop,
          parent,
          key: step[1],
          value: parent.value?.[step[1]],
        }))
        break
      case NavigatorType.Index:
        accesses[i + 1] = accesses[i].map((parent) => ({
          type: NavigatorType.Index,
          parent,
          key: step[1],
          value: parent.value?.[step[1]],
        }))
        break
      case NavigatorType.Slice:
        accesses[i + 1] = accesses[i].flatMap((parent) => {
          const [start, end] = resolveSlice(parent.value, step[1], step[2])
          return Array.from<any, IndexAccess>({ length: end - start }, (_, index) => ({
            type: NavigatorType.Index,
            parent,
            key: start + index,
            value: parent.value?.[start + index],
          }))
        })
        break
      default: throw TypeError('not implemented')
    }
  }

  return accesses
}

type Updater = (value: any, args: any[]) => any

// path = foo.bar, root= { foo: { bar: xxx } }

export function apply(path: Path, parent: any, updater: Updater, args: any[]) {
  if (path.length === 0) return updater(parent, args)

  const [nav, ...pathRest] = path

  switch (nav[0]) {
    case NavigatorType.Prop:
    case NavigatorType.Index: {
      const value = parent?.[nav[1]]
      const newValue = apply(pathRest, value, updater, args)
      if (newValue === value) return parent
      const parentCopy = copy(parent, nav[0])
      parentCopy[nav[1]] = newValue
      return parentCopy
    }
    case NavigatorType.Slice: {
      const [start, end] = resolveSlice(parent, nav[1], nav[2])
      let hasChanges = false
      const newValues = parent?.slice(start, end).map((value: any) => {
        const newValue = apply(pathRest, value, updater, args)
        hasChanges ||= newValue !== value
        return newValue
      })
      if (!hasChanges) return parent
      const parentCopy = copy(parent, nav[0])
      parentCopy.splice(start, end - start, ...newValues)
      return parentCopy
    }
    default: throw TypeError('not implemented')
  }
}

function resolveSlice(value: any, start: number, end: number): [number, number] {
  return [resolveSliceIndex(value, start ?? 0), resolveSliceIndex(value, end ?? value?.length ?? 0)]
}

function resolveSliceIndex(value: any, index: number): number {
  if (index >= 0) return index
  if (!value || !('length' in value)) return 0
  return -index < value.length ? value.length + index : 0
}

export function write(accesses: Access[][], refs = new Set()) {
  for (let i = accesses.length - 1; i > 0; i--) {
    for (const { type, parent, key, value } of accesses[i]) {
      if (!refs.has(parent.value)) refs.add(parent.value = copy(parent.value, type))
      parent.value[key] = value
    }
  }
}

function copy(value: any, accessType: NavigatorType) {
  if (value === undefined || value === null) {
    switch (accessType) {
      case NavigatorType.Prop: return {}
      case NavigatorType.Index: return []
      default: throw TypeError('not implemented')
    }
  }

  if (typeof value !== 'object') throw TypeError('not implemented')

  return Array.isArray(value) ? [...value] : { ...value }
}
