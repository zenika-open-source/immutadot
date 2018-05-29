import * as types from '@immutadot/parser/consts'
import { NONE } from './consts'
import { index } from './_index'
import { prop } from './prop'

export function nav(path) {
  return path.map(toNav).reduceRight((next, nav) => nav(next), finalNav)
}

function toNav([type, value]) {
  switch (type) {
  case types.prop: return prop(value)
  case types.index: return index(value)
  default: throw TypeError(type)
  }
}

function finalNav(value) {
  return (updater = NONE) => updater === NONE ? value : updater(value)
}
