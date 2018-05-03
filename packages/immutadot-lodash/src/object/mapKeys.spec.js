/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { mapKeys } from 'object'
describe('MapKeys', () => {
  it('should replace the keys of object', () => {
    immutaTest({
      nested: {
        prop: {
          a: 1,
          b: 2,
          c: 3,
        },
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = mapKeys(input, path, (_, k) => `_${k}`)
      expect(output).toEqual({
        nested: {
          prop: {
            _a: 1,
            _b: 2,
            _c: 3,
          },
        },
        other: {},
      })
      return output
    })
  })
})
