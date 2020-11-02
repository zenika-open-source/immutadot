/* eslint-env jest */
import { flat } from 'array'
import { immutaTest } from 'test.utils'
describe('array.map', () => {
  it('should map elements and flatten', () => {
    immutaTest({
      nested: {
        prop: [
          [1, 2],
          [3, 4],
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = flat(input, path)
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
