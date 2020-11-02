/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pullAt } from 'array'
describe('PullAt', () => {
  it('should remove several elements', () => {
    immutaTest({
      nested: {
        prop: [
          4,
          3,
          2,
          1,
        ],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = pullAt(input, path, [
        1,
        3,
      ])
      expect(output).toEqual({
        nested: {
          prop: [
            4,
            2,
          ],
        },
        other: {},
      })
      return output
    })
  })
})
