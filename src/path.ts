export type Path = Navigator[]

export type Navigator = PropIndexNavigator | SliceNavigator

export type PropIndexNavigator = [NavigatorType.PropIndex, string | symbol | number | NavigatorVariable, boolean]
export type SliceNavigator = [NavigatorType.Slice, number | NavigatorVariable, number | NavigatorVariable, boolean]

export const enum NavigatorType {
  PropIndex,
  Slice,
}

export type NavigatorVariable = PathArgument

export type PathArgument = [NavigatorVariableType.PathArgument, any]

export const enum NavigatorVariableType {
  PathArgument,
}

export function isPathArgument(value: any): value is PathArgument {
  return value?.[0] === NavigatorVariableType.PathArgument
}
