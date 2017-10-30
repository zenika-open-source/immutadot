import _update from 'lodash/fp/update'
import { lodashFpConvert } from 'util/lodashFpConvert'
import { update } from 'core/update'

const convertedUpdate = lodashFpConvert(_update)

/**
 * Updates the value at <code>path</code> of <code>object</code> using the <code>updater</code> function.<br/>
 * The updater is invoked with <code>value</code> and <code>…args</code>.<br/>
 * Be carefull, the <code>updater</code> function must not mutate its <code>value</code> argument.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} updater The function to produce the updated value.
 * @param {...*} args The remaining args.
 * @return {Object} Returns the updated object.
 * @example <caption>Updating a prop</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const object = { nested: { prop: 4 } }
 * update(object, 'nested.prop', inc) // => { nested: { prop: 5 } }
 * update(object, 'nested.prop', inc, 2) // => { nested: { prop: 6 } }
 * @see {@link https://lodash.com/docs#update|lodash.update} for more information.
 * @since 0.1.5
 */
const formerUpdate = (object, path, updater, ...args) => convertedUpdate(object, path, v => updater(v, ...args))

/**
 * This is an alias for {@link core.update}.
 * @function update
 * @memberof object
 * @since 0.1.5
 * @deprecated Use {@link core.update}
 */
export { formerUpdate, update }
