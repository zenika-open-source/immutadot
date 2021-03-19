import { isNil } from 'util/lang'

export const onCopy = (cb, force = false) => value => {
  const nil = isNil(value)
  if (nil && !force) return value
  const newValue = nil ? {} : { ...value }
  cb(newValue, value)
  return newValue
}
