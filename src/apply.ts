import { isNavigatorArgument, NavigatorType, Path } from './path'

export type Updater = (value: any, args: any[]) => any

export function apply(path: Path, pathArgs: any[], parent: any, updater: Updater, updaterArgs: any[]) {
  if (path.length === 0) return updater(parent, updaterArgs)

  const [nav, ...pathRest] = path

  switch (nav[0]) {
    case NavigatorType.PropIndex: {
      if (nav[2] && parent == null) return parent // Optional access shortcut
      // FIXME propIndex is of type any...
      const propIndex = isNavigatorArgument(nav[1]) ? pathArgs[nav[1][1]] : nav[1]
      const value = parent?.[propIndex]
      const newValue = apply(pathRest, pathArgs, value, updater, updaterArgs)
      if (newValue === value) return parent
      const parentCopy = copy(parent, typeof propIndex === 'number' && propIndex >= 0) // FIXME isArrayAccess...
      parentCopy[propIndex] = newValue
      return parentCopy
    }
    case NavigatorType.Slice: {
      if (parent == null) {
        if (nav[3]) return parent
        return []
      }
      const [start, end] = resolveSlice(
        parent,
        isNavigatorArgument(nav[1]) ? pathArgs[nav[1][1]] : nav[1],
        isNavigatorArgument(nav[2]) ? pathArgs[nav[2][1]] : nav[2],
      )
      let hasChanges = false
      const newValues = parent?.slice(start, end).map((value: any) => {
        const newValue = apply(pathRest, pathArgs, value, updater, updaterArgs)
        hasChanges ||= newValue !== value
        return newValue
      })
      if (!hasChanges) return parent
      const parentCopy = copy(parent, true)
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
  if (value == null || !('length' in value)) return 0
  return Math.max(value.length + index, 0)
}

function copy(value: any, isArrayAccess: boolean) {
  if (value === undefined || value === null) return isArrayAccess ? [] : {}
  if (typeof value !== 'object') throw TypeError('not implemented')
  return Array.isArray(value) ? [...value] : { ...value }
}
