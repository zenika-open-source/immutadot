import { isNil } from 'util/lang'
import { unsafeToPath } from './toPath'

/**
* Gets the value at <code>path</code> of <code>obj</code>.
* @memberof core
* @param {*} obj The object.
* @param {string|Array} path The path of the property to get.
* @param {*} defaultValue The default value.
* @return {*} Returns the value or <code>defaultValue</code>.
* @example get({ nested: { prop: 'val' } }, 'nested.prop') // => 'val'
* @example get({ nested: { prop: 'val' } }, 'nested.unknown', 'default') // => 'default'
* @since 1.0.0
 */
export function get(obj, path, defaultValue) {
  function walkPath(curObj, remPath) {
    if (remPath.length === 0) return curObj === undefined ? defaultValue : curObj
    if (isNil(curObj)) return defaultValue
    const [prop, ...pathRest] = remPath
    return walkPath(curObj[prop], pathRest)
  }
  return walkPath(obj, unsafeToPath(path))
}
