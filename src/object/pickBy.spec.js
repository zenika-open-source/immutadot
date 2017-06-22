/* eslint-env node, mocha */
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
    pickBy(objectOne, 'nested', v => v < 3).should.deep.equal(output)
  })

  it('should pick all matching props by key', () => {
    pickBy(objectOne, 'nested', (v, k) => k < 'c').should.deep.equal(output)
  })
})
