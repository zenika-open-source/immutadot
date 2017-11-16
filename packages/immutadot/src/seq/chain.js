import { ChainWrapper } from './ChainWrapper'

/**
 * Creates an immutadot wrapper instance that wraps <code>object</code> allowing to make sequences of immutadot functions calls on it.<br/>
 * The result of such sequences must be unwrapped with {@link seq#value|value}.<br/>
 * The object on which the functions are called may be changed with an optional <code>path</code>.
 * @function
 * @memberof seq
 * @param {Object} object The object to wrap.
 * @param {Array|string} [path] The path of the object on which functions are called.
 * @return {Object} Returns the new immutadot wrapper instance.
 * @example <caption>Chain several operations</caption>
 * chain({ nested1: { prop: 'old' }, nested2: { prop: 1 } })
 *   .set('nested1.prop', 'new')
 *   .unset('nested2.prop')
 *   .value() // => { nested1: { prop: 'new' }, nested2: {} }
 * @example <caption>Chain on a path</caption>
 * chain({ nested: { prop1: 'old', prop2: 1 } }, 'nested')
 *   .set('prop1', 'new')
 *   .unset('prop2')
 *   .value() // => { nested: { prop1: 'new' } }
 * @see {@link seq#value|value} for more information.
 * @since 0.1.8
 */
const chain = (object, path) => new ChainWrapper(object, path)
export { chain }
