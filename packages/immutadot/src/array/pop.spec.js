/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pop } from 'array'
describe('array.pop', () => {
  it('should remove last element', () => {
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
      const output = pop(input, path)
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
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = pop(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
  it('should wrap value in array and remove it', () => {
    immutaTest({
      nested: { prop: 123 },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = pop(input, path)
      expect(output).toEqual({
        nested: { prop: [] },
        other: {},
      })
      return output
    })
  })
})
