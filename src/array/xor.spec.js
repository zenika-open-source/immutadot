/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { xor } from './xor'

describe('Xor', () => {

  const withOneAndTwo = { nested: { prop: [1, 2] } }
  const oneAndThree = [1, 3]
  const withOneAndThree = { nested: { prop: oneAndThree } }
  const twoAndThree = [2, 3]
  const withTwoAndThree = { nested: { prop: twoAndThree } }

  it('should xor arrays', () => {
    immutaTest((input, path) => {
      const output = xor(input, path, twoAndThree)
      expect(output).toEqual(withOneAndThree)
      return output
    }, withOneAndTwo, 'nested.prop')

    immutaTest((input, path) => {
      const output = xor(input, path, oneAndThree)
      expect(output).toEqual(withTwoAndThree)
      return output
    }, withOneAndTwo, 'nested.prop')
  })

  it('should xor deep undefined to array', () => {
    immutaTest((input, path) => {
      const output = xor(input, path, oneAndThree)
      expect(output).toEqual(withOneAndThree)
      return output
    }, undefined, 'nested.prop')
  })
})
