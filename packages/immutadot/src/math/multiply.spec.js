/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { multiply } from 'math'

describe('Multiply', () => {

  it('should multiply two numbers', () => {
    immutaTest((input, path) => {
      const output = multiply(input, path, 2)
      expect(output).toEqual({
        nested: { prop: 666 }, // 😈
        other: {},
      })
      return output
    }, {
      nested: { prop: 333 },
      other: {},
    }, 'nested.prop')
  })
})
