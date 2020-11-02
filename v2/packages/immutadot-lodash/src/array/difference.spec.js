/* eslint-env jest */
import { difference } from 'array'
import { immutaTest } from 'test.utils'
describe('Difference', () => {
  it('should remove intersecting elements', () => {
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
      const output = difference(input, path, [
        3,
        4,
      ])
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
  it('should remove intersecting elements from several arrays', () => {
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
      const output = difference(input, path, [1], [2])
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
      const output = difference(input, path, [
        1,
        2,
      ])
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
})
