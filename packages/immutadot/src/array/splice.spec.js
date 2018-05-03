/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { splice } from 'array'
describe('array.splice', () => {
  it('should replace two elements', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
          3,
          4,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = splice(input, path, 1, 2, 6, 6)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            6,
            6,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
