export type Path = Navigator[]

export type Navigator = PropIndexNavigator | SliceNavigator

export type PropIndexNavigator = [NavigatorType.PropIndex, string | symbol | number | NavigatorVariable, boolean]
export type SliceNavigator = [NavigatorType.Slice, number | NavigatorVariable, number | NavigatorVariable, boolean]

export const enum NavigatorType {
  PropIndex,
  Slice,
}

export type NavigatorVariable = NavigatorArgument

export type NavigatorArgument = [NavigatorVariableType.Argument, number]

export const enum NavigatorVariableType {
  Argument,
}

export function isNavigatorArgument(value: any): value is NavigatorArgument {
  return value?.[0] === NavigatorVariableType.Argument
}
