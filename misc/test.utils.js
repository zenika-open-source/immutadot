import forEach from 'lodash/forEach'

export const toRefs = object => {
  const stack = [['', object]]
  const refs = []

  while (stack.length) {
    const ref = stack.shift()
    refs.push(ref)
    forEach(ref[1], (value, prop) => {
      stack.push([`${ref[0]}${ref[0].length ? '.' : ''}${prop}`, value])
    })
  }

  return refs
}
