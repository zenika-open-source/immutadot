import { index, prop, slice } from '@immutadot/parser/consts'
import { indexNav, sliceNav } from './array'
import { propNav } from './object'

export function nav(path) {
  return path.reduceRight((next, [type, value]) => toNav(type)(value, next), finalNav)
}

function toNav(type) {
  switch (type) {
  case prop: return propNav
  case index: return indexNav
  case slice: return sliceNav
  default: throw TypeError(type)
  }
}

class FinalNav {
  constructor(value) {
    this.value = value
  }

  get() {
    return this.value
  }

  update(updater) {
    return updater(this.value)
  }
}

function finalNav(value) {
  return new FinalNav(value)
}
