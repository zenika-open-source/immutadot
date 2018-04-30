/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { intersectionBy } from 'array'
describe('IntersectionBy', () => {
  it('should replace by intersection of arrays', () => {
    immutaTest({
      nested: {
        prop: [
          1.2,
          2.1,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = intersectionBy(input, path, [
        2.3,
        3.2,
      ], Math.floor)
      expect(output).toEqual({
        nested: { prop: [2.1] },
        other: {},
      })
      return output
    })
  })
})
