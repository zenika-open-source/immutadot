/* eslint-env jest */
import { divide } from 'lang'
import { immutaTest } from 'test.utils'

describe('lang.divide', () => {

  it('should divide two numbers', () => {
    immutaTest((input, path) => {
      const output = divide(input, path, 2)
      expect(output).toEqual({
        nested: { prop: 666 }, // 😈
        other: {},
      })
      return output
    }, {
      nested: { prop: 1332 },
      other: {},
    }, 'nested.prop')
  })
})
