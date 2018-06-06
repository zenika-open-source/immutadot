/**
 * Manage a curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function curried(...newArgs) {
  const { fn, last, minArity } = this

  if (last) {
    const [obj] = newArgs
    return fn(obj, ...this.args)
  }

  const args = this.args.concat(newArgs)

  return curried.bind({
    ...this,
    args,
    last: args.length >= minArity - 1,
  })
}

/**
 * Manage a maybe curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function maybeCurried(...args) {
  const { fn, minArity } = this

  if (args.length >= minArity) return fn(...args)

  return curried.bind({
    ...this,
    last: args.length === minArity - 1,
    args,
  })
}

export function curry(fn, minArity = fn.length) {
  return maybeCurried.bind({
    fn,
    minArity,
  })
}
