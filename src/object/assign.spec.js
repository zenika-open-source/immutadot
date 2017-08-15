/* eslint-env jest */
import { assign } from './assign'

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
    expect(assign(objectOne, 'nested', objectTwo)).toEqual(output)
  })
})
