export const makeNav = ({ update, get, unset }) => params => next => ({
  get update() {
    return update(params, next.update)
  },
  get get() {
    return get(params, next.get)
  },
  get unset() {
    return unset(params, next.unset)
  },
})
