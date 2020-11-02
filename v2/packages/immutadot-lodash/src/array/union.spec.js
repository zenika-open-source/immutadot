/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { union } from 'array'
describe('Union', () => {
  it('should create a set of unique values', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = union(input, path, [
        2,
        3,
      ])
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
            3,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
