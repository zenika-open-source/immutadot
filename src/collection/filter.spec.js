/* eslint-env jest */
import { filter } from 'collection'
import { immutaTest } from 'test.utils'

describe('Filter', () => {
  it('should filter an array', () => {
    immutaTest((input, path) => {
      const output = filter(input, path, v => v % 2)
      expect(output).toEqual({
        nested: { prop: [1, 3] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })
})
