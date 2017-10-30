/* eslint-env jest */
import { convert } from 'core'
import { immutaTest } from 'test.utils'

describe('Convert', () => {

  const inc = (v, i = 1) => v + i

  it('should wrap a function', () => {
    const immutableInc = convert(inc)

    immutaTest((input, path) => {
      const output = immutableInc(input, path)
      expect(output).toEqual({
        nested: { prop: 6 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 5 },
      other: {},
    }, 'nested.prop')

    immutaTest((input, path) => {
      const output = immutableInc(input, path, 2)
      expect(output).toEqual({
        nested: { prop: 7 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 5 },
      other: {},
    }, 'nested.prop')
  })
})
