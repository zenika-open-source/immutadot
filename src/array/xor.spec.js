/* eslint-env node, mocha */
import xor from './xor'

describe('Xor', () => {

  const withOneAndTwo = { nested: { prop: [1, 2] } }
  const oneAndThree = [1, 3]
  const withOneAndThree = { nested: { prop: oneAndThree } }
  const twoAndThree = [2, 3]
  const withTwoAndThree = { nested: { prop: twoAndThree } }

  it('should xor arrays', () => {
    xor(withOneAndTwo, 'nested.prop', twoAndThree).should.deep.equal(withOneAndThree)
    xor(withOneAndTwo, 'nested.prop', oneAndThree).should.deep.equal(withTwoAndThree)
  })

  it('should xor deep undefined to array', () => {
    xor({}, 'nested.prop', oneAndThree).should.deep.equal(withOneAndThree)
    xor(undefined, 'nested.prop', oneAndThree).should.deep.equal(withOneAndThree)
  })
})
