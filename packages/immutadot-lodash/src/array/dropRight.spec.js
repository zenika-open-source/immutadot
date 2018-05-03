/* eslint-env jest */
import { dropRight } from 'array'
import { immutaTest } from 'test.utils'
describe('DropRight', () => {
  it('should drop several elements at the end of the array', () => {
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
      const output = dropRight(input, path, 2)
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
