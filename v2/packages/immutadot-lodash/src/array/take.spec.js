/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { take } from 'array'
describe('Take', () => {
  it('should take one element', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
          3,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = take(input, path, 1)
      expect(output).toEqual({
        nested: { prop: [1] },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = take(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
})
