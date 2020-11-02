/* eslint-env jest */
import { assign } from 'object'
import { immutaTest } from 'test.utils'
describe('object.assign', () => {
  it('should assign objects', () => {
    immutaTest({
      nested: {
        prop: {
          a: 1,
          b: 2,
        },
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = assign(input, path, {
        b: 3,
        c: 4,
      })
      expect(output).toEqual({
        nested: {
          prop: {
            a: 1,
            b: 3,
            c: 4,
          },
        },
        other: {},
      })
      return output
    })
  })
})
