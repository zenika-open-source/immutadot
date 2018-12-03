import { apply } from 'core/apply'
import { toString } from 'util/lang'

export function applyStringMethod(method, { arity = method.length + 1, fixedArity = false } = {}) {
  return apply(
    (value, ...args) => method.apply(toString(value), args),
    {
      arity,
      fixedArity,
    },
  )
}
