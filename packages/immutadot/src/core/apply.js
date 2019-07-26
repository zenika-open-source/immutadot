import { curry } from './curry'
import { nav } from 'nav/nav'
import { resolveGetter } from './get'
import { toPath } from 'immutadot-parser'

const getResolveArg = lazy => lazy ? resolveGetter : arg => arg

function apply(fn, { arity = fn.length, fixedArity = false, curried = true, lazy = true } = {}) {
  const resolveArg = getResolveArg(lazy)

  let appliedFn

  if (fixedArity) {
    switch (arity) {
    case 0:
    case 1:
      appliedFn = (obj, path) => nav(toPath(path)).update(fn)(obj)
      break
    case 2:
      appliedFn = (obj, path, arg) => nav(toPath(path)).update(
        value => fn(value, resolveArg(arg, obj)),
      )(obj)
      break
    case 3:
      appliedFn = (obj, path, arg1, arg2) => nav(toPath(path)).update(
        value => fn(
          value,
          resolveArg(arg1, obj),
          resolveArg(arg2, obj),
        ),
      )(obj)
      break
    case 4:
      appliedFn = (obj, path, arg1, arg2, arg3) => nav(toPath(path)).update(
        value => fn(
          value,
          resolveArg(arg1, obj),
          resolveArg(arg2, obj),
          resolveArg(arg3, obj),
        ),
      )(obj)
      break
    }
  }

  if (!appliedFn) {
    appliedFn = (obj, path, ...args) => nav(toPath(path)).update(
      value => fn(
        value,
        ...args.map(arg => resolveArg(arg, obj)),
      ),
    )(obj)
  }

  if (curried) {
    return curry(appliedFn, {
      // Add obj and path but remove value in arity
      arity: arity + 1,
      fixedArity,
    })
  }

  return appliedFn
}

export { apply }
