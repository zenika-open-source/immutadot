/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { union } from './union'

describe('Union', () => {

  it('should create a set of unique values', () => {
    immutaTest((input, path) => {
      const output = union(input, path, [2, 3])
      expect(output).toEqual({ nested: { prop: [1, 2, 3] } })
      return output
    }, { nested: { prop: [1, 2] } }, 'nested.prop')
  })
})
