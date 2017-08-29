/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { mapValues } from './mapValues'

describe('MapValues', () => {
  it('should map over each values of an object', () => {
    immutaTest((input, path) => {
      const output = mapValues(input, path, v => v * v)
      expect(output).toEqual({
        nested: {
          prop: {
            a: 1,
            b: 4,
            c: 9,
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
        },
      },
      other: {},
    }, 'nested.prop')
  })
})
