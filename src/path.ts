export type Path = Navigator[]

export type Navigator = PropNavigator | IndexNavigator

export type PropNavigator = [NavigatorType.Prop, string]

export type IndexNavigator = [NavigatorType.Index, number]

export const enum NavigatorType {
  Prop,
  Index,
}
