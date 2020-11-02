/* eslint-env jest */
import { defaults } from 'object'
import { immutaTest } from 'test.utils'
describe('Defaults', () => {
  it('should assign default properties objects', () => {
    immutaTest({
      nested: {
        prop: {
          a: 1,
          b: 2,
        },
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = defaults(input, path, {
        b: 3,
        c: 4,
      })
      expect(output).toEqual({
        nested: {
          prop: {
            a: 1,
            b: 2,
            c: 4,
          },
        },
        other: {},
      })
      return output
    })
  })
})
