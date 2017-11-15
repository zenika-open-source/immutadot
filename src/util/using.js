import { UsingWrapper } from './UsingWrapper'

/**
 * Allows to specify one or several paths to use as arguments for an immutadot function call.<br/>
 * <code>using.placeholder</code> may be used to insert a passed argument before a path argument (see second example).
 * @function
 * @memberof util
 * @param {...(Array|string)} paths The paths to use as arguments.
 * @return {Object} Returns an object with immutadot functions.
 * @playground
 * require("lodash/package.json")
 * const { using } = require("immutadot")
 * // Add b to a
 * const o = { nested: { a: 2, b: 3 } }
 * using('nested.b').add(o, 'nested.a') // => { nested: { a: 5, b: 3 } }
 * // Replace a by a * b + c  (use placeholder to send updater as first argument)
 * const o = { nested: { a: 2, b: 3 } }
 * using(using.placeholder, 'nested.b')
 *   .update(o, 'nested.a', (a, b, c) => a * b + c, 4) // => { nested: { a: 10, b: 3 } }
 * @since 0.1.12
 */
const using = (...paths) => new UsingWrapper(...paths)

const { placeholder } = UsingWrapper
using.placeholder = placeholder
using._ = placeholder

export {
  placeholder,
  placeholder as _,
  using,
}
