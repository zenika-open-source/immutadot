function recurFreeze(value) {
  if (typeof value !== 'object') return
  if (Array.isArray(value)) value.forEach(recurFreeze)
  else Object.values(value).forEach(recurFreeze)
  return Object.freeze(value)
}

module.exports = {
  recurFreeze,
}
