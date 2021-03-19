import { isNil } from 'util/lang'

export const onCopy = (cb, force = false) => value => {
  const nil = isNil(value)
  if (nil && !force) return value
  let newValue
  if (nil) newValue = []
  else newValue = Array.isArray(value) ? [...value] : { ...value }
  cb(newValue, value)
  return newValue
}
