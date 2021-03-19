import { NavigatorType, Path } from './path'

type Updater = (value: any, args: any[]) => any

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
