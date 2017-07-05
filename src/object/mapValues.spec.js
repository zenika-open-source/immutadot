/* eslint-env jest */
import mapValues from './mapValues'

describe('MapValues', () => {
  it('should map over each values of an object', () => {
    const input = {
      nested: {
        a: 1,
        b: 2,
        c: 3,
      },
      d: 4,
    }

    const output = mapValues(input, 'nested', v => v * v)

    expect(output).toEqual({
      nested: {
        a: 1,
        b: 4,
        c: 9,
      },
      d: 4,
    })

    expect(input).toEqual({
      nested: {
        a: 1,
        b: 2,
        c: 3,
      },
      d: 4,
    })
  })
})
