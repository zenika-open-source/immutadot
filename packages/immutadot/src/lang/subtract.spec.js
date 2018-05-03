/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { subtract } from 'lang'
describe('lang.subtract', () => {
  it('should subtract two numbers', () => {
    immutaTest({
      nested: { prop: 2000 },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = subtract(input, path, 336)
      expect(output).toEqual({
        nested: { prop: 1664 },
        other: {},
      })
      return output
    })
  })
})
