/* eslint-env node, mocha */
import { expect } from 'chai'
import pickBy from './pickBy'

describe('PickBy', () => {

  const objectOne = {
    nested: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    },
  }
  const output = {
    nested: {
      a: 1,
      b: 2,
    },
  }

  it('should pick all matching props by value', () => {
    expect(pickBy(objectOne, 'nested', v => v < 3)).to.be.deep.equal(output)
  })

  it('should pick all matching props by key', () => {
    expect(pickBy(objectOne, 'nested', (v, k) => k < 'c')).to.be.deep.equal(output)
  })
})
