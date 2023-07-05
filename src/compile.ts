import { parse } from './parse'
import { NavigatorType, PathArgument, PropIndexNavigator, SliceNavigator, isPathArgument } from './path'
import { Updater } from './updater'

export function compile<Args extends any[]>(chunks: readonly string[], tmplArgs: any[], updater: Updater<Args>) {
  const path = parse(chunks)

  return path.reduceRight(
    (next, nav) => {
      switch (nav[0]) {
        case NavigatorType.PropIndex: {
          return propIndexLink(nav, next)
        }

        case NavigatorType.Slice: {
          return sliceLink(nav, next)
        }

        default: throw TypeError('not implemented')
      }
    },
    updaterLink(updater),
  )
}

export type Link<Args extends any[]> = (parent: any, pathArgs: any[], updaterArgs: Args) => any

function updaterLink<Args extends any[]>(updater: Updater<Args>): Link<Args> {
  return (value, _pathArgs, updaterArgs) => updater(value, ...updaterArgs)
}

function propIndexLink<Args extends any[]>([, key, optional]: PropIndexNavigator, next: Link<Args>): Link<Args> {
  return (parent, pathArgs, updaterArgs) => {
    if (optional && parent == null) return parent // Optional access shortcut

    const arg = isPathArgument(key) ? pathArgs[key[1]] : key

    if (typeof arg === 'function') {
      if (parent == null) return [] // Undefined parent shortcut

      if (Array.isArray(parent)) {
        let hasChanges = false

        const copy2 = parent.map((value, i) => {
          if (!arg(value, i)) return value

          const newValue = next(value, pathArgs, updaterArgs)
          hasChanges ||= newValue !== value
          return newValue
        })

        if (!hasChanges) return parent

        return copy2
      }
    }

    const value = parent?.[arg]

    const newValue = next(value, pathArgs, updaterArgs)

    if (newValue === value) return parent // No change shorcut

    const parentCopy = copy(parent, isIndex(arg))
    parentCopy[arg] = newValue
    return parentCopy
  }
}

function sliceLink<Args extends any[]>([, navStart, navEnd, optional]: SliceNavigator, next: Link<Args>): Link<Args> {
  return (parent, pathArgs, updaterArgs) => {
    if (parent == null) return optional ? parent : [] // Undefined parent shortcut

    if (!Array.isArray(parent)) throw TypeError(`Slice notation is not defined for ${typeof parent}`)

    const [start, end] = resolveSlice(parent, getSliceArg(navStart, pathArgs), getSliceArg(navEnd, pathArgs))

    let hasChanges = false
    const newValues = parent?.slice(start, end).map((value: any) => {
      const newValue = next(value, pathArgs, updaterArgs)
      hasChanges ||= newValue !== value
      return newValue
    })

    if (!hasChanges) return parent // No change shortcut

    const parentCopy = [...parent]
    parentCopy.splice(start, end - start, ...newValues)
    return parentCopy
  }
}

function copy(value: any, isArrayAccess: boolean) {
  if (value == null) return isArrayAccess ? [] : {}
  if (typeof value !== 'object') throw TypeError('not implemented')
  return Array.isArray(value) ? [...value] : { ...value }
}

function isIndex(value: any): value is number {
  return Number.isSafeInteger(value) && value >= 0
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