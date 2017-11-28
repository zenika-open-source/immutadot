import { UsingWrapper } from './UsingWrapper'

/**
 * Allows to specify one or several paths to use as arguments for an immutadot function call.<br/>
 * <code>using.placeholder</code> may be used to insert a passed argument before a path argument (see second example).
 * @function
 * @memberof util
 * @param {...(Array|string)} paths The paths to use as arguments.
 * @return {Object} Returns an object with immutadot functions.
 * @example <caption>Push <code>b</code>, <code>c</code> and <code>4</code> to <code>a</code></caption>
 * const o = { nested: { a: [1], b: 2, c: 3 } }
 * using('nested.b', 'nested.c').push(o, 'nested.a', 4) // => { nested: { a: [1, 2, 3, 4], b: 2, c: 3 } }
 * @example <caption>Replace <code>a</code> by <code>a * b + 4</code> (use placeholder to send <code>updater</code> as first argument)</caption>
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
