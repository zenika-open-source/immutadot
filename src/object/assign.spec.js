/* eslint-env node, mocha */
import assign from './assign'

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
    assign(objectOne, 'nested', objectTwo).should.deep.equal(output)
  })
})
