import { apply } from 'core/apply'
import { isNil } from 'util/lang'

const toArray = array => {
  if (isNil(array)) return []
  if (Array.isArray(array)) return array
  return [array]
}

const toArrayCopy = array => {
  if (isNil(array)) return []
  if (Array.isArray(array)) return [...array]
  return [array]
}

const applyMethodReturnResult = (method, thisArg, args) => method.apply(thisArg, args)

const applyMethodReturnThis = (method, thisArg, args) => {
  method.apply(thisArg, args)
  return thisArg
}

const applyArrayMethod = (name, { method = Array.prototype[name], arity = method && method.length, fixedArity = false, mutating = true } = {}) => {
  if (!method) {
    const error = `immutadot: Array.prototype.${name} is not available`
    // eslint-disable-next-line no-console
    console.warn(error)
    return () => { throw TypeError(error) }
  }

  const getArray = mutating ? toArrayCopy : toArray
  const applyMethod = mutating ? applyMethodReturnThis : applyMethodReturnResult
  return apply(
    (value, ...args) => applyMethod(method, getArray(value), args),
    {
      arity: arity + 1,
      fixedArity,
    },
  )
}

export { applyArrayMethod }
