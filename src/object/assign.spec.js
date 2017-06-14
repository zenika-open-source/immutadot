/* eslint-env node, mocha */
import assign from './assign'
import { expect } from 'chai'

describe('Assign', () => {

  const objectOne = {
    nested: {
      a: 1,
      b: 2,
    },
  }
  const objectTwo = {
    b: 3,
    c: 4,
  }
  const output = {
    nested: {
      a: 1,
      b: 3,
      c: 4,
    },
  }

  it('should assign objects', () => {
    expect(assign(objectOne, 'nested', objectTwo)).to.be.deep.equal(output)
  })
})
