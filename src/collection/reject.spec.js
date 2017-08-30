/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { reject } from './reject'

describe('Reject', () => {
  it('should reject an array', () => {
    immutaTest((input, path) => {
      const output = reject(input, path, v => v % 2)
      expect(output).toEqual({
        nested: { prop: [2, 4] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })
})
