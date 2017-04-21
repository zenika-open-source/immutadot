import fpUpdate from 'lodash/fp/update'
import isFunction from 'lodash/isFunction'

import { lodashFpConvertOptions } from './consts'

const rawUpdate = fpUpdate.convert(lodashFpConvertOptions)

const updatePassingArgs = (obj, path, fn, ...args) => rawUpdate(obj, path, v => fn(v, ...args))

const update = (...args) => {
  if (args.length === 1 && isFunction(args[0])) {
    return (obj, path, ...rest) => updatePassingArgs(obj, path, args[0], ...rest)
  }
  return updatePassingArgs(...args)
}

export default update
