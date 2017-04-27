import ChainWrapper from './ChainWrapper'

/**
 * Creates an immutadot wrapper instance that wraps value allowing to make sequences of immutadot functions calls on it.
 * The result of such sequences must be unwrapped with {@link ChainWrapper#value}
 * @function chain
 * @memberof seq
 * @param {*} value The value to wrap.
 * @return {ChainWrapper} Returns the new immutadot wrapper instance.
 * @see {@link ChainWrapper} for more information
 * @since 0.1.8
 */
export default value => new ChainWrapper(value)
