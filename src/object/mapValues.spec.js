/* eslint-env node, mocha */
import { expect } from 'chai'
import mapValues from './mapValues'

describe('MapValues', () => {
  const objectOne = {
    nested: {
      a: 1,
      b: 2,
      c: 3,
    },
    d: 4,
  }
  const output = {
    nested: {
      a: 1,
      b: 4,
      c: 9,
    },
    d: 4,
  }

  it('should map over each values of an object', () => {
    expect(mapValues(objectOne, 'nested', v => v * v)).to.be.deep.equal(output)
  })
})
