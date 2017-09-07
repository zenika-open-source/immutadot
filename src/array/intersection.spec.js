/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { intersection } from 'array'

describe('Intersection', () => {

  it('should replace by intersection of arrays', () => {
    immutaTest((input, path) => {
      const output = intersection(input, path, [2, 3])
      expect(output).toEqual({
        nested: { prop: [2] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2] },
      other: {},
    }, 'nested.prop')
  })
})
