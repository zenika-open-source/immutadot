import { apply } from 'core/apply'
import { toString } from 'util/lang'

export function applyStringMethod(method, { arity = method.length, fixedArity = false } = {}) {
  return apply(
    (value, ...args) => method.apply(toString(value), args),
    {
      arity: arity + 1,
      fixedArity,
    },
  )
}
