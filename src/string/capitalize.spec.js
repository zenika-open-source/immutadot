/* eslint-env jest */
import { capitalize } from './capitalize'
import { immutaTest } from 'test.utils'

describe('Capitalize', () => {

  it('should convert the first character of string to upper case and the remaining to lower case', () => {
    immutaTest((input, path) => {
      const output = capitalize(input, path)
      expect(output).toEqual({ nested: { prop: 'A string' } })
      return output
    }, { nested: { prop: 'a string' } }, 'nested.prop')
  })
})
