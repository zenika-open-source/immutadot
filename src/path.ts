export type Path = Navigator[]

export type Navigator = PropNavigator | IndexNavigator

export type PropNavigator = [NavigatorType.Prop, string]
export type IndexNavigator = [NavigatorType.Index, number]

export const enum NavigatorType {
  Root,
  Prop,
  Index,
}

export type Access = RootAccess | PropAccess | IndexAccess

export type RootAccess = [NavigatorType.Root, null, null, any]
export type PropAccess = [NavigatorType.Prop, Access, string, any]
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
      default: throw TypeError('not implemented')
    }
  }

  return accesses
}

export function write(accesses: Access[][]) {
  const refs = new Set()

  for (let i = accesses.length - 1; i > 0; i--) {
    for (const [type, parent, key, value] of accesses[i]) {
      if (!refs.has(parent[3])) {
        if (parent[3] === undefined || parent[3] === null) {
          switch (type) {
            case NavigatorType.Prop:
              refs.add(parent[3] = {})
              break
            case NavigatorType.Index:
              refs.add(parent[3] = [])
              break
          }
        } else {
          if (typeof parent[3] !== 'object') throw TypeError('not implemented')

          refs.add(parent[3] = Array.isArray(parent[3]) ? [...parent[3]] : { ...parent[3] })
        }
      }

      parent[3][key] = value
    }
  }
}
