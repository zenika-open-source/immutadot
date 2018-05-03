/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { multiply } from 'lang'
describe('lang.multiply', () => {
  it('should multiply two numbers', () => {
    immutaTest({
      nested: { prop: 333 },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = multiply(input, path, 2)
      expect(output).toEqual({
        nested: { prop: 666 },
        other: {},
      })
      return output
    })
  })
})
