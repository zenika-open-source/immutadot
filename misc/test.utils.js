/* eslint-env jest */
import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'

export const toRefs = object => {
  const stack = [['', object]]
  const refs = []

  while (stack.length) {
    const ref = stack.shift()
    refs.push(ref)
    if (!isObject(ref[1])) continue
    forEach(ref[1], (value, prop) => {
      stack.push([`${ref[0]}${ref[0].length ? '.' : ''}${prop}`, value])
    })
  }

  return refs
}

export const immutaTest = (input, paths, cb) => {
  const inputRefs = toRefs(input)

  const output = cb(input)

  expect(input).toBeDeep(inputRefs)
  expect(output).toBeDeep(inputRefs, { exclude: paths })
  if (paths.length !== 0)
    expect(output).not.toBeDeep(inputRefs, { include: paths })
}
