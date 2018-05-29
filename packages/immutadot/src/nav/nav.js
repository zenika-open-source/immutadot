import { index, prop, slice } from '@immutadot/parser/consts'
import { indexNav, sliceNav } from './array'
import { propNav } from './object'

export function nav(path) {
  return path.map(toNav).reduceRight((next, nav) => nav(next), finalNav)
}

function toNav([type, value]) {
  switch (type) {
  case prop: return propNav(value)
  case index: return indexNav(value)
  case slice: return sliceNav(value)
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
