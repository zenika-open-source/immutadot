/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { omit } from 'object'
describe('Omit', () => {
  it('should omit properties of object', () => {
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
      const output = omit(input, path, 'b')
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
