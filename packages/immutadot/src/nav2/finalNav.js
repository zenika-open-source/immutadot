const update = updater => value => updater(value)

export const finalNav = operation => {
  switch (operation) {
  case 'update': return update
  case 'get': return null
  case 'unset': return null
  }
  throw TypeError(`Unknown navigator operation ${operation}`)
}

