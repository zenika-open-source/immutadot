/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { merge } from 'object'
describe('Merge', () => {
  it('should merge objects', () => {
    immutaTest({
      nested: { prop: { a: 1 } },
      other: {},
    }, ['nested'], (input, path) => {
      const output = merge(input, path, {
        prop: {
          a: 2,
          b: 3,
        },
      })
      expect(output).toEqual({
        nested: {
          prop: {
            a: 2,
            b: 3,
          },
        },
        other: {},
      })
      return output
    })
  })
})
