/* eslint-env node, mocha */
import { expect } from 'chai'

import xor from './xor'

describe('Xor', () => {

  const withOneAndTwo = { nested: { prop: [1, 2] } }
  const withOneAndThree = { nested: { prop: [1, 3] } }
  const withTwoAndThree = { nested: { prop: [2, 3] } }

  it('should xor arrays', () => {
    expect(xor(withOneAndTwo, 'nested.prop', [2, 3])).to.be.deep.equal(withOneAndThree)
    expect(xor(withOneAndTwo, 'nested.prop', [1, 3])).to.be.deep.equal(withTwoAndThree)
  })

  it('should xor deep undefined to array', () => {
    expect(xor({}, 'nested.prop', [1, 3])).to.be.deep.equal(withOneAndThree)
    expect(xor(undefined, 'nested.prop', [1, 3])).to.be.deep.equal(withOneAndThree)
  })
})
