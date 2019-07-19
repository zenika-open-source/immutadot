const update = updater => value => updater(value)

const get = () => value => value

const unset = () => undefined

export const finalNav = operation => {
  switch (operation) {
  case 'update': return update
  case 'get': return get
  case 'unset': return unset
  }
  throw TypeError(`Unknown navigator operation ${operation}`)
}

