import * as types from '@immutadot/parser/consts'
import { index, slice } from './array'
import { NONE } from './consts'
import { prop } from './object'

export function nav(path) {
  return path.map(toNav).reduceRight((next, nav) => nav(next), finalNav)
}

function toNav([type, value]) {
  switch (type) {
  case types.prop: return prop(value)
  case types.index: return index(value)
  case types.slice: return slice(value)
  default: throw TypeError(type)
  }
}

function finalNav(value) {
  return (updater = NONE) => updater === NONE ? value : updater(value)
}
