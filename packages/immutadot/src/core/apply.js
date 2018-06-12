import { curry } from './curry'
import { nav } from 'nav/nav'
import { toPath } from '@immutadot/parser'

function apply(fn, arity = fn.length) {
  return curry((obj, path, ...args) => nav(toPath(path))(obj).update(value => fn(value, ...args)), arity + 2)
}

export { apply }
