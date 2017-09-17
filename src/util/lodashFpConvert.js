const lodashFpConvertOptions = {
  rearg: false,
  curry: false,
}

/**
 * Converts a lodash/fp function with options <code>{ rearg: false, curry: false }</code>.
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the converted lodash/fp function.
 * @since 0.2.0
 * @private
 */
const lodashFpConvert = fn => fn.convert(lodashFpConvertOptions)

export { lodashFpConvert }
