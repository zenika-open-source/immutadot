import { allProps, index, prop, slice } from '@immutadot/parser/consts'
import { allPropsNav } from './allPropsNav'
import { indexNav } from './indexNav'
import { propNav } from './propNav'
import { sliceNav } from './sliceNav'

export function nav(path) {
  return path.reduceRight((next, [type, value]) => toNav(type)(value, next), finalNav)
}

function toNav(type) {
  switch (type) {
  case allProps: return allPropsNav
  case index: return indexNav
  case prop: return propNav
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
