import ChainWrapper from './ChainWrapper'

/**
 * Creates an immutadot wrapper instance that wraps value allowing to make sequences of immutadot functions calls on it.<br/>
 * The result of such sequences must be unwrapped with {@link seq#value|value}.
 * @function chain
 * @memberof seq
 * @param {*} value The value to wrap.
 * @return {Object} Returns the new immutadot wrapper instance.
 * @example
 * chain({ nested1: { prop: 'old' }, nested2: { prop: 1 } })
 *   .set('nested1.prop', 'new')
 *   .unset('nested2.prop')
 *   .value() // => { nested1: { prop: 'new' }, nested2: {} }
 * @see {@link seq#value|value} for more information.
 * @since 0.1.8
 */
export default value => new ChainWrapper(value)
