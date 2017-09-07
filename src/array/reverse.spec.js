/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { reverse } from 'array'

describe('Reverse', () => {

  it('should reverse the elements', () => {
    immutaTest((input, path) => {
      const output = reverse(input, path)
      expect(output).toEqual({
        nested: { prop: [3, 2, 1] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3] },
      other: {},
    }, 'nested.prop')
  })
})
