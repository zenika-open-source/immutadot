/* eslint-env jest */
import xor from './xor'

describe('Xor', () => {

  const withOneAndTwo = { nested: { prop: [1, 2] } }
  const oneAndThree = [1, 3]
  const withOneAndThree = { nested: { prop: oneAndThree } }
  const twoAndThree = [2, 3]
  const withTwoAndThree = { nested: { prop: twoAndThree } }

  it('should xor arrays', () => {
    expect(xor(withOneAndTwo, 'nested.prop', twoAndThree)).toEqual(withOneAndThree)
    expect(xor(withOneAndTwo, 'nested.prop', oneAndThree)).toEqual(withTwoAndThree)
  })

  it('should xor deep undefined to array', () => {
    expect(xor({}, 'nested.prop', oneAndThree)).toEqual(withOneAndThree)
    expect(xor(undefined, 'nested.prop', oneAndThree)).toEqual(withOneAndThree)
  })
})
