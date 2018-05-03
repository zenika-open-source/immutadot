/* eslint-env jest */
import { dropRightWhile } from 'array'
import { immutaTest } from 'test.utils'
describe('DropRightWhile', () => {
  it('should drop elements > 2 at the end of the array', () => {
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
      const output = dropRightWhile(input, path, v => v > 2)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
