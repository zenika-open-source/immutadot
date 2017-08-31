/* eslint-env jest */
import { divide } from './divide'
import { immutaTest } from 'test.utils'

describe('Divide', () => {

  it('should divide two numbers', () => {
    immutaTest((input, path) => {
      const output = divide(input, path, 2)
      expect(output).toEqual({
        nested: { prop: 666 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 1332 },
      other: {},
    }, 'nested.prop')
  })
})
