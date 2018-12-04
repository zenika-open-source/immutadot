const lodashFpConvertOptions = {
  curry: false,
  fixed: false,
  rearg: false,
}

/**
 * Converts a lodash/fp function with options <code>{ curry: false, fixed: false, rearg: false }</code>.
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the converted lodash/fp function.
 * @since 0.2.0
 * @private
 */
const lodashFpConvert = fn => fn.convert(lodashFpConvertOptions)

export { lodashFpConvert }
