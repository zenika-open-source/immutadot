/**
 * Manage a curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function curried(...args) {
  const { fn, last, minArity } = this

  if (last) {
    const obj = args.length === 0 ? undefined : args[0]
    return fn(obj, ...this.args)
  }

  this.args.push(...args)
  this.last = this.args.length >= minArity - 1

  return curried.bind(this)
}

/**
 * Manage a maybe curried call.
 * @returns {function|*} Either a new function or the result of the call to the actual function
 * @this Object
 */
function maybeCurried(...args) {
  const { fn, minArity } = this

  if (args.length >= minArity) return fn(...args)

  this.last = args.length === minArity - 1
  this.args = args

  return curried.bind(this)
}

export function curry(fn, minArity = fn.length) {
  return maybeCurried.bind({
    fn,
    minArity,
  })
}
