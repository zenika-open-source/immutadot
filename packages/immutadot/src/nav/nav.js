import { NavType } from '@immutadot/parser'
import { finalNav } from './finalNav'
import { indexNav } from './indexNav'
import { propNav } from './propNav'
import { propsNav } from './propsNav'
import { sliceNav } from './sliceNav'

export function nav(path) {
  if (path.length === 0) throw new TypeError('path should not be empty')

  return path.reduceRight((next, [type, value]) => toNav(type)(value, next), finalNav)
}

function toNav(type) {
  switch (type) {
  case NavType.allProps:
  case NavType.list:
    return propsNav
  case NavType.index: return indexNav
  case NavType.prop: return propNav
  case NavType.slice: return sliceNav
  default: throw TypeError(type)
  }
}
