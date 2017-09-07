/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pick } from 'object'

describe('Pick', () => {

  it('should pick properties of object', () => {
    immutaTest((input, path) => {
      const output = pick(input, path, 'b')
      expect(output).toEqual({
        nested: { prop: { b: 2 } },
        other: {},
      })
      return output
    }, {
      nested: {
        prop: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
      other: {},
    }, 'nested.prop')
  })
})
