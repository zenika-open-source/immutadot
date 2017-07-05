/* eslint-env jest */
import pickBy from './pickBy'

describe('PickBy', () => {

  const input = {
    nested: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    },
  }

  it('should pick all matching props by value', () => {
    const output = pickBy(input, 'nested', v => v < 3)

    expect(output).toEqual({
      nested: {
        a: 1,
        b: 2,
      },
    })

    expect(input).toEqual({
      nested: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
    })
  })

  it('should pick all matching props by key', () => {
    const output = pickBy(input, 'nested', (v, k) => k < 'c')

    expect(output).toEqual({
      nested: {
        a: 1,
        b: 2,
      },
    })

    expect(input).toEqual({
      nested: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      },
    })
  })
})
