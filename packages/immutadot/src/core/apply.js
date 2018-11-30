import { curry } from './curry'
import { nav } from 'nav/nav'
import { resolveGetter } from './get'
import { toPath } from '@immutadot/parser'

function apply(fn, { arity = fn.length, fixedArity = false, curried = true, lazy = true } = {}) {
  let iFn

  if (fixedArity) {
    switch (arity) {
    case 0:
    case 1:
      iFn = (obj, path) => nav(toPath(path))(obj).update(fn)
      break
    case 2:
      iFn = (obj, path, arg) => nav(toPath(path))(obj).update(
        value => fn(value, lazy ? resolveGetter(arg, obj) : arg),
      )
      break
    case 3:
      iFn = (obj, path, arg1, arg2) => nav(toPath(path))(obj).update(
        value => fn(
          value,
          lazy ? resolveGetter(arg1, obj) : arg1,
          lazy ? resolveGetter(arg2, obj) : arg2,
        ),
      )
      break
    case 4:
      iFn = (obj, path, arg1, arg2, arg3) => nav(toPath(path))(obj).update(
        value => fn(
          value,
          lazy ? resolveGetter(arg1, obj) : arg1,
          lazy ? resolveGetter(arg2, obj) : arg2,
          lazy ? resolveGetter(arg3, obj) : arg3,
        ),
      )
      break
    }
  }

  if (!iFn) {
    iFn = (obj, path, ...args) => {
      let resolvedArgs = args
      if (lazy) resolvedArgs = args.map(arg => resolveGetter(arg, obj))
      const updater = value => fn(value, ...resolvedArgs)
      return nav(toPath(path))(obj).update(updater)
    }
  }

  if (curried)
    // Add obj and path but remove value in arity
    // TODO try improving curry when fixedArity is true
    return curry(iFn, arity + 1)

  return iFn
}

export { apply }
