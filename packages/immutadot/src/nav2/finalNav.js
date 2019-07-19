const update = updater => value => updater(value)

const get = () => value => value

const unset = () => undefined

export const finalNav = {
  update,
  get,
  unset,
}
