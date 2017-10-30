import { apply } from './apply'
import { unsafeToPath } from './toPath'

/**
 * Updates the value at <code>path</code> of <code>object</code> using the <code>updater</code> function.<br/>
 * The updater is invoked with <code>value</code> and <code>…args</code>.<br/>
 * Be carefull, the <code>updater</code> function must not mutate its <code>value</code> argument.
 * @function
 * @memberof core
 * @param {Object} obj The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} updater The function to produce the updated value.
 * @param {...*} args The remaining args.
 * @return {Object} Returns the updated object.
 * @example <caption>Updating a prop</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const object = { nested: { prop: 4 } }
 * update(object, 'nested.prop', inc) // => { nested: { prop: 5 } }
 * update(object, 'nested.prop', inc, 2) // => { nested: { prop: 6 } }
 * @since 0.4.0
 */
const update = (obj, path, updater, ...param) => apply(
  obj,
  unsafeToPath(path),
  curObj => updater(curObj, ...param),
)

export { update }
