/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { xorBy } from 'array'
describe('XorBy', () => {
  it('should xor arrays', () => {
    immutaTest({
      nested: {
        prop: [{ x: 1 },
          { x: 2 },
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = xorBy(input, path, [{ x: 2 },
        { x: 3 },
      ], 'x')
      expect(output).toEqual({
        nested: {
          prop: [{ x: 1 },
            { x: 3 },
          ],
        },
        other: {},
      })
      return output
    })
  })
})
