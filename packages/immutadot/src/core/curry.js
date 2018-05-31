function call(fn, pArgs, maxArity) {
  // FIXME should we cap to maxArity ?
  const args = (maxArity !== undefined && pArgs.length > maxArity) ? pArgs.slice(0, maxArity) : pArgs
  const objIndex = args.length - 1
  return fn(args[objIndex], ...args.slice(0, objIndex))
}

/**
 * Manage a curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function curried(...pArgs) {
  const { fn, last, maxArity, minArity } = this
  const args = [...this.args, ...pArgs]
  const { length } = args
  const isNextLast = length >= minArity - 1

  if (last || isNextLast && maxArity !== undefined && length >= maxArity)
    return call(fn, args, maxArity)

  return curried.bind({
    ...this,
    args,
    last: isNextLast,
  })
}

/**
 * Manage a maybe curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function maybeCurried(...args) {
  const { fn, minArity } = this
  // FIXME should we cap to maxArity ?
  if (args.length >= minArity) return fn(...args)
  return curried.bind({
    ...this,
    args,
    last: args.length === minArity - 1,
  })
}

export function curry(fn, minArity, maxArity) {
  return maybeCurried.bind({
    fn,
    minArity,
    maxArity,
  })
}
