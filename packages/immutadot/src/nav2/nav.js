import { finalNav } from './finalNav'
import { propNav } from './propNav'
import { propsNav } from './propsNav'

const toNav = ([type, params]) => {
  switch (type) {
  case 'prop': return propNav(params)
  case 'props': return propsNav(params)
  }
  throw TypeError(`Unknown navigator type ${type}`)
}

export const nav = path => {
  if (path.length === 0) throw new TypeError('Path should not be empty')

  return path.reduceRight((next, step) => toNav(step)(next), finalNav)
}
