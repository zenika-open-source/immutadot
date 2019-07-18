import { finalNav } from './finalNav'
import { propNav } from './propNav'

const toNav = ([type, params]) => {
  switch (type) {
  case 'prop': return propNav(params)
  }
  throw TypeError(`Unknown navigator type ${type}`)
}

export const nav = path => {
  if (path.length === 0) throw new TypeError('Path should not be empty')

  return path.reduceRight((next, step) => toNav(step)(next), finalNav)
}
