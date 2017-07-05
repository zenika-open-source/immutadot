/**
 * Lodash FP conversion options.
 * @constant {Object}
 * @memberof util
 * @since 0.1.5
 * @private
 */
const lodashFpConvertOptions = {
  rearg: false,
  curry: false,
}

/**
 * Converts a lodash/fp function with {@link util.lodashFpConvertOptions|lodashFpConvertOptions}.
 * @function lodashFpConvert
 * @memberof util
 * @param {function} fn The lodash/fp function.
 * @return {function} Returns the converted lodash/fp function.
 * @since 0.1.14
 * @private
 */
export default fn => fn.convert(lodashFpConvertOptions)
