/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toUpper } from './toUpper'

describe('toUpper', () => {

  it('should convert string, as a whole, to upper case just like String#toUpperCase', () => {
    immutaTest((input, path) => {
      const output = toUpper(input, path)
      expect(output).toEqual({ nested: { prop: 'A STRING' } })
      return output
    }, { nested: { prop: 'a string' } }, 'nested.prop')
  })
})
