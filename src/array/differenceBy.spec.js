/* eslint-env jest */
import { differenceBy } from 'array'
import { immutaTest } from 'test.utils'

describe('DifferenceBy', () => {

  it('should remove intersecting elements according to iteratee', () => {
    immutaTest((input, path) => {
      const output = differenceBy(input, path, [5.4, 2.1], Math.floor)
      expect(output).toEqual({
        nested: { prop: [1.2, 3.4] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1.2, 3.4, 5.6] },
      other: {},
    }, 'nested.prop')
  })
})
