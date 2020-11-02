/* eslint-env jest */
import { flatMap } from 'array'
import { immutaTest } from 'test.utils'
describe('array.map', () => {
  it('should map elements and flatten', () => {
    immutaTest({
      nested: {
        prop: [
          { arr: [1, 2] },
          { arr: [3, 4] },
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = flatMap(input, path, ({ arr }) => arr)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
            3,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
