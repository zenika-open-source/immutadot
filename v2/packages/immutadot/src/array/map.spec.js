/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { map } from 'array'
describe('array.map', () => {
  it('should map elements', () => {
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
      const output = map(input, path, v => v * v)
      expect(output).toEqual({
        nested: {
          prop: [
            1,
            4,
            9,
            16,
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should replace deep undefined with array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = map(input, path, v => v)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
  it('should wrap value in an array', () => {
    immutaTest({ nested: { prop: 2 } }, ['nested.prop'], (input, path) => {
      const output = map(input, path, v => v * v)
      expect(output).toEqual({ nested: { prop: [4] } })
      return output
    })
  })
})
