import { curry } from './curry'
import { nav } from 'nav/nav'
import { resolveGetter } from './get'
import { toPath } from '@immutadot/parser'

const getResolveArg = lazy => lazy ? resolveGetter : arg => arg

function apply(fn, { arity = fn.length, fixedArity = false, curried = true, lazy = true } = {}) {
  const resolveArg = getResolveArg(lazy)

  let appliedFn

  if (fixedArity) {
    switch (arity) {
    case 0:
    case 1:
      appliedFn = (obj, path) => nav(toPath(path))(obj).update(fn)
      break
    case 2:
      appliedFn = (obj, path, arg) => nav(toPath(path))(obj).update(
        value => fn(value, resolveArg(arg, obj)),
      )
      break
    case 3:
      appliedFn = (obj, path, arg1, arg2) => nav(toPath(path))(obj).update(
        value => fn(
          value,
          resolveArg(arg1, obj),
          resolveArg(arg2, obj),
        ),
      )
      break
    case 4:
      appliedFn = (obj, path, arg1, arg2, arg3) => nav(toPath(path))(obj).update(
        value => fn(
          value,
          resolveArg(arg1, obj),
          resolveArg(arg2, obj),
          resolveArg(arg3, obj),
        ),
      )
      break
    }
  }

  if (!appliedFn) {
    appliedFn = (obj, path, ...args) => nav(toPath(path))(obj).update(
      value => fn(
        value,
        ...args.map(arg => resolveArg(arg, obj)),
      ),
    )
  }

  if (curried)
    // Add obj and path but remove value in arity
    // TODO try improving curry when fixedArity is true
    return curry(appliedFn, arity + 1)

  return appliedFn
}

export { apply }
