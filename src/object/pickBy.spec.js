/* eslint-env jest */
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
    expect(pickBy(objectOne, 'nested', v => v < 3)).toEqual(output)
  })

  it('should pick all matching props by key', () => {
    expect(pickBy(objectOne, 'nested', (v, k) => k < 'c')).toEqual(output)
  })
})
