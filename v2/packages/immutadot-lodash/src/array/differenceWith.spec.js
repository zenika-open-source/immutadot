/* eslint-env jest */
import { differenceWith } from 'array'
import { immutaTest } from 'test.utils'
describe('DifferenceWith', () => {
  it('should remove intersecting elements according to iteratee', () => {
    immutaTest({
      nested: {
        prop: [{ x: 1 },
          { x: 2 },
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = differenceWith(input, path, [{ x: 2 },
        { x: 3 },
      ], (a, b) => a.x === b.x)
      expect(output).toEqual({
        nested: { prop: [{ x: 1 }] },
        other: {},
      })
      return output
    })
  })
})
