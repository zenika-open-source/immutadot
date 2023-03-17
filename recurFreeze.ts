export function recurFreeze<T>(value: T): T {
  if (value == null || typeof value !== 'object') return value
  if (Array.isArray(value)) value.forEach(recurFreeze)
  else Object.values(value).forEach(recurFreeze)
  return Object.freeze(value)
}
