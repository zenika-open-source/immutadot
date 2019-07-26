import { finalNav } from './finalNav'
import { indexNav } from './indexNav'
import { propNav } from './propNav'
import { propsNav } from './propsNav'

const navs = {
  prop: propNav,
  props: propsNav,
  index: indexNav,
}

const toNav = ([type, params]) => {
  if (!navs[type]) throw TypeError(`Unknown navigator type ${type}`)
  return navs[type](params)
}

export const nav = path => {
  if (path.length === 0) throw new TypeError('Path should not be empty')
  return path.reduceRight((next, step) => toNav(step)(next), finalNav)
}
