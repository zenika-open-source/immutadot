/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toUpper } from 'string'
describe('toUpper', () => {
  it('should convert string, as a whole, to upper case just like String#toUpperCase', () => {
    immutaTest({ nested: { prop: 'a string' } }, ['nested.prop'], (input, path) => {
      const output = toUpper(input, path)
      expect(output).toEqual({ nested: { prop: 'A STRING' } })
      return output
    })
  })
})
