/* eslint-env jest */
import { drop } from 'array'
import { immutaTest } from 'test.utils'
describe('Drop', () => {
  it('should drop an element at the start of the array', () => {
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
      const output = drop(input, path)
      expect(output).toEqual({
        nested: {
          prop: [
            2,
            3,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should drop several elements at the start of the array', () => {
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
      const output = drop(input, path, 2)
      expect(output).toEqual({
        nested: {
          prop: [
            3,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = drop(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
})
