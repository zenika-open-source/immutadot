/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { unionWith } from 'array'
describe('UnionWith', () => {
  it('should create a set of unique values', () => {
    immutaTest({
      nested: {
        prop: [{ x: 1 },
          { x: 2 },
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = unionWith(input, path, [{ x: 2 },
        { x: 3 },
      ], (a, b) => a.x === b.x)
      expect(output).toEqual({
        nested: {
          prop: [{ x: 1 },
            { x: 2 },
            { x: 3 },
          ],
        },
        other: {},
      })
      return output
    })
  })
})
