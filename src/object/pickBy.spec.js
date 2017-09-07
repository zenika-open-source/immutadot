/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pickBy } from 'object'

describe('PickBy', () => {

  it('should pick all matching props by value', () => {
    immutaTest((input, path) => {
      const output = pickBy(input, path, v => v < 3)
      expect(output).toEqual({
        nested: {
          prop: {
            a: 1,
            b: 2,
          },
        },
        other: {},
      })
      return output
    }, {
      nested: {
        prop: {
          a: 1,
          b: 2,
          c: 3,
          d: 4,
        },
      },
      other: {},
    }, 'nested.prop')
  })
})
