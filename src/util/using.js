import UsingWrapper from './UsingWrapper'

/**
 * Allows to specify one or several paths to use as arguments for an immutadot function call.
 * @function using
 * @memberof util
 * @param {...(Array|string)} paths The paths to use as arguments.
 * @return {Object} Returns an object with immutadot functions.
 * @example <caption>Add <code>b</code> to <code>a</code></caption>
 * const o = { nested: { a: 2, b: 3 } }
 * using('nested.b').add(o, 'nested.a') // => { nested: { a: 5, b: 3 } }
 * @example <caption>Replace <code>a</code> by <code>a * b + c</code></caption>
 * const o = { nested: { a: 2, b: 3, c: 4 } }
 * using('nested.b', 'nested.c')
 *   .update(o, 'nested.a', (a, b, c) => a * b + c) // => { nested: { a: 10, b: 3, c: 4 } }
 * @since 0.1.12
 */
export default (...paths) => new UsingWrapper(...paths)
