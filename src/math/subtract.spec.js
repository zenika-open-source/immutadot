/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { subtract } from 'math'

describe('Subtract', () => {

  it('should subtract two numbers', () => {
    immutaTest((input, path) => {
      const output = subtract(input, path, 336)
      expect(output).toEqual({
        nested: { prop: 1664 }, // 🍺
        other: {},
      })
      return output
    }, {
      nested: { prop: 2000 },
      other: {},
    }, 'nested.prop')
  })
})
