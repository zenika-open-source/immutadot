import { isNil } from 'util/lang'
import { unsafeToPath } from './toPath'

export function get(obj, pPath, defaultValue) {
  const path = unsafeToPath(pPath)
  const walkPath = (curObj, remPath) => {
    if (remPath.length === 0) return curObj === undefined ? defaultValue : curObj
    if (isNil(curObj)) return defaultValue
    const [prop, ...pathRest] = remPath
    return walkPath(curObj[prop], pathRest)
  }
  return walkPath(obj, path)
}
