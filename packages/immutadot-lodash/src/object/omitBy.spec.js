/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { omitBy } from 'object'
describe('OmitBy', () => {
  it('should omit properties matching predicate', () => {
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
      const output = omitBy(input, path, v => v === 2)
      expect(output).toEqual({
        nested: {
          prop: {
            a: 1,
            c: 3,
          },
        },
        other: {},
      })
      return output
    })
  })
})
