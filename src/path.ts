export type Path = Navigator[]

export type Navigator = PropNavigator | IndexNavigator | SliceNavigator

export type PropNavigator = [NavigatorType.Prop, string | symbol]
export type IndexNavigator = [NavigatorType.Index, number]
export type SliceNavigator = [NavigatorType.Slice, number, number]

export const enum NavigatorType {
  Prop,
  Index,
  Slice,
}
