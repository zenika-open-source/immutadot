import { SliceBound } from "./sliceBound"

export enum NavType {
  allProps = "allProps",
  index = "index",
  list = "list",
  prop = "prop",
  slice = "slice",
}

type AllPropsSegment = [NavType.allProps]
export const allPropsSegment = (): PathSegment => [NavType.allProps]

type IndexSegment = [NavType.index, number]
export const indexSegment = (index: number): PathSegment => [NavType.index, index]

type PropListSegment = [NavType.list, string[]]
export const propListSegment = (props: string[]): PathSegment => [NavType.list, props]

type PropSegment = [NavType.prop, string]
export const propSegment = (prop: string): PathSegment => [NavType.prop, prop]

type SliceSegment = [NavType.slice, [SliceBound, SliceBound, SliceBound]]
export const sliceSegment = (start: SliceBound, end: SliceBound, step: SliceBound): PathSegment =>
  [NavType.slice, [start, end, step]]

export type PathSegment = AllPropsSegment | IndexSegment | PropListSegment | PropSegment | SliceSegment
export type Path = PathSegment[]

export const Path = {
  allPropsSegment,
  indexSegment,
  propListSegment,
  propSegment,
  sliceSegment,
}
