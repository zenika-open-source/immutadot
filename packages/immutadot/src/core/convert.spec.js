/* eslint-env jest */
import { convert } from 'core'
import { immutaTest } from 'test.utils'

describe('core.convert', () => {

  const inc = (v, i = 1) => v + i

  it('should wrap a function', () => {
    const immutableInc = convert(inc)

    immutaTest({
      nested: { prop: 5 },
      other: {},
    },
    ['nested.prop'],
    input => {
      const output = immutableInc(input, 'nested.prop')
      expect(output).toEqual({
        nested: { prop: 6 },
        other: {},
      })
      return output
    })

    immutaTest({
      nested: { prop: 5 },
      other: {},
    },
    ['nested.prop'],
    input => {
      const output = immutableInc(input, 'nested.prop', 2)
      expect(output).toEqual({
        nested: { prop: 7 },
        other: {},
      })
      return output
    })
  })
})
