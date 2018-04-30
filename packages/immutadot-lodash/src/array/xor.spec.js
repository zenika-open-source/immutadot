/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { xor } from 'array'
describe('Xor', () => {
  const withOneAndTwo = {
    nested: {
      prop: [
        1,
        2,
      ],
    },
    other: {},
  }
  const oneAndThree = [
    1,
    3,
  ]
  const withOneAndThree = {
    nested: { prop: oneAndThree },
    other: {},
  }
  const twoAndThree = [
    2,
    3,
  ]
  const withTwoAndThree = {
    nested: { prop: twoAndThree },
    other: {},
  }
  it('should xor arrays', () => {
    immutaTest(withOneAndTwo, ['nested.prop'], (input, path) => {
      const output = xor(input, path, twoAndThree)
      expect(output).toEqual(withOneAndThree)
      return output
    })
    immutaTest(withOneAndTwo, ['nested.prop'], (input, path) => {
      const output = xor(input, path, oneAndThree)
      expect(output).toEqual(withTwoAndThree)
      return output
    })
  })
  it('should xor deep undefined to array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = xor(input, path, oneAndThree)
      expect(output).toEqual({ nested: { prop: oneAndThree } })
      return output
    })
  })
})
