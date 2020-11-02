/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { sort } from 'array'
describe('array.sort', () => {
  it('should sort elements', () => {
    immutaTest({
      nested: {
        prop: [
          2,
          4,
          3,
          1,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            2,
            3,
            4,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should sort elements with specified order', () => {
    immutaTest({
      nested: {
        prop: [
          2,
          4,
          3,
          1,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = sort(input, path, (a, b) => b - a)
      expect(output).toEqual({
        nested: {
          prop: [
            4,
            3,
            2,
            1,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
  it('should wrap value in an array', () => {
    immutaTest({ nested: { prop: 2 } }, ['nested.prop'], (input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({ nested: { prop: [2] } })
      return output
    })
  })
})
