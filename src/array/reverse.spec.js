/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { reverse } from './reverse'

describe('Reverse', () => {

  it('should reverse the elements', () => {
    immutaTest((input, path) => {
      const output = reverse(input, path)
      expect(output).toEqual({ nested: { prop: [3, 2, 1] } })
      return output
    }, { nested: { prop: [1, 2, 3] } }, 'nested.prop')
  })
})
