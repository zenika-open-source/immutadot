/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { takeWhile } from 'array'
describe('TakeWhile', () => {
  it('should take one element at the beginning of the array', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
          3,
          1,
          2,
          3,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = takeWhile(input, path, v => v < 2)
      expect(output).toEqual({
        nested: { prop: [1] },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = takeWhile(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
})
