/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toLower } from 'string'

describe('toLower', () => {

  it('should convert string, as a whole, to lower case just like String#toLowerCase', () => {
    immutaTest((input, path) => {
      const output = toLower(input, path)
      expect(output).toEqual({ nested: { prop: 'a string' } })
      return output
    }, { nested: { prop: 'A STRING' } }, 'nested.prop')
  })
})
