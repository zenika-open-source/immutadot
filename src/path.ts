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

export type RootAccess = [NavigatorType.Root, null, null, any]
export type PropAccess = [NavigatorType.Prop, Access, string | symbol, any]
export type IndexAccess = [NavigatorType.Index, Access, number, any]

export function read(path: Navigator[], root: any): Access[][] {
  const accesses: Access[][] = Array(path.length + 1)

  accesses[0] = [[NavigatorType.Root, null, null, root]]

  for (let i = 0; i < path.length; i++) {
    const step = path[i]

    switch (step[0]) {
      case NavigatorType.Prop:
        accesses[i + 1] = accesses[i].map((parent) => [NavigatorType.Prop, parent, step[1], parent[3]?.[step[1]]])
        break
      case NavigatorType.Index:
        accesses[i + 1] = accesses[i].map((parent) => [NavigatorType.Index, parent, step[1], parent[3]?.[step[1]]])
        break
      case NavigatorType.Slice:
        accesses[i + 1] = accesses[i].flatMap((parent) => {
          const [start, end] = resolveSlice(parent[3], step[1], step[2])
          return slice(parent[3], start, end).map<IndexAccess>((value, index) => [NavigatorType.Index, parent, start + index, value])
        })
        break
      default: throw TypeError('not implemented')
    }
  }

  return accesses
}

function slice(value: any, start: number, end: number): any[] {
  return value.slice(start, end)
}

function resolveSlice(value: any, start: number, end: number): [number, number] {
  return [start ?? 0, end ?? value.length ?? 0]
}

export function write(accesses: Access[][]) {
  const refs = new Set()

  for (let i = accesses.length - 1; i > 0; i--) {
    for (const [type, parent, key, value] of accesses[i]) {
      if (!refs.has(parent[3])) refs.add(parent[3] = copy(parent[3], type))
      parent[3][key] = value
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
