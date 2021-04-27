import { isPathArgument, NavigatorType, Path, PathArgument } from './path'

export type Updater = (value: any, args: any[]) => any

export function walk(path: Path, pathArgs: any[], parent: any, updater: Updater, updaterArgs: any[]) {
  if (path.length === 0) return updater(parent, updaterArgs)

  const [nav, ...pathRest] = path

  switch (nav[0]) {
    case NavigatorType.PropIndex: {
      if (nav[2] && parent == null) return parent // Optional access shortcut

      const arg = isPathArgument(nav[1]) ? pathArgs[nav[1][1]] : nav[1]

      const value = parent?.[arg]

      const newValue = walk(pathRest, pathArgs, value, updater, updaterArgs)

      if (newValue === value) return parent // No change shorcut

      const parentCopy = copy(parent, isIndex(arg))
      parentCopy[arg] = newValue
      return parentCopy
    }

    case NavigatorType.Slice: {
      if (parent == null) return nav[3] ? parent : [] // Undefined parent shortcut

      if (!Array.isArray(parent)) throw TypeError(`Slice notation is not defined for ${typeof parent}`)

      const [start, end] = resolveSlice(parent, getSliceArg(nav[1], pathArgs), getSliceArg(nav[2], pathArgs))

      let hasChanges = false
      const newValues = parent?.slice(start, end).map((value: any) => {
        const newValue = walk(pathRest, pathArgs, value, updater, updaterArgs)
        hasChanges ||= newValue !== value
        return newValue
      })

      if (!hasChanges) return parent // No change shortcut

      const parentCopy = [...parent]
      parentCopy.splice(start, end - start, ...newValues)
      return parentCopy
    }
    default: throw TypeError('not implemented')
  }
}

function copy(value: any, isArrayAccess: boolean) {
  if (value == null) return isArrayAccess ? [] : {}
  if (typeof value !== 'object') throw TypeError('not implemented')
  return Array.isArray(value) ? [...value] : { ...value }
}

function resolveSlice(value: any, start: number, end: number): [number, number] {
  return [resolveSliceIndex(value, start ?? 0), resolveSliceIndex(value, end ?? value?.length ?? 0)]
}

function resolveSliceIndex(value: any, index: number): number {
  if (index >= 0) return index
  if (value == null || !('length' in value)) return 0
  return Math.max(value.length + index, 0)
}

function getSliceArg(value: number | PathArgument, pathArgs: any[]): number {
  if (!isPathArgument(value)) return value
  const pathArg = pathArgs[value[1]]
  if (pathArg != null && !Number.isSafeInteger(pathArg)) throw TypeError('Slice bounds must be integers or undefined/null')
  return pathArg
}

function isIndex(value: any): value is number {
  return Number.isSafeInteger(value) && value >= 0
}
