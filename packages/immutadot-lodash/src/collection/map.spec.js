/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { map } from 'collection'
describe('Map', () => {
  it('should map an array', () => {
    immutaTest({
      nested: {
        prop: [
          1,
          2,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = map(input, path, v => v * 2)
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
  it('should replace deep undefined with empty array', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = map(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    })
  })
})
