/* eslint-env jest */
import convert from './convert'

describe('Convert', () => {

  const inc = (v, i = 1) => v + i

  it('should wrap a function', () => {
    const immutableInc = convert(inc)

    expect(immutableInc({ nested: { prop: 5 } }, 'nested.prop')).toEqual({ nested: { prop: 6 } })
    expect(immutableInc({ nested: { prop: 5 } }, 'nested.prop', 2)).toEqual({ nested: { prop: 7 } })
  })
})
