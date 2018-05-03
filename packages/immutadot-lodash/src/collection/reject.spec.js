/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { reject } from 'collection'
describe('Reject', () => {
  it('should reject elements of an array', () => {
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
      const output = reject(input, path, v => v % 2)
      expect(output).toEqual({
        nested: {
          prop: [
            2,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
