/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { slice } from 'array'

describe('array.slice', () => {

  it('should replace by a slice', () => {
    immutaTest((input, path) => {
      const output = slice(input, path, 1, 3)
      expect(output).toEqual({
        nested: { prop: [2, 3] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })
})
