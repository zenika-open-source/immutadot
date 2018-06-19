import { curry } from './curry'
import { isGetter } from './get'
import { nav } from 'nav/nav'
import { toPath } from '@immutadot/parser'

function apply(fn, arity = fn.length) {
  return curry(
    (obj, path, ...args) => {
      const resolvedArgs = args.map(arg => arg[isGetter] ? arg(obj) : arg)
      const updater = value => fn(value, ...resolvedArgs)
      return nav(toPath(path))(obj).update(updater)
    },
    arity + 1, // Add obj and path but remove value
  )
}

export { apply }
