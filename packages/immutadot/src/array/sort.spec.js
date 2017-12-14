/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { sort } from 'array'

describe('Reverse', () => {

  it('should sort elements', () => {
    immutaTest((input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({
        nested: { prop: [1, 2, 3, 4] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [2, 4, 3, 1] },
      other: {},
    }, 'nested.prop')
  })

  it('should sort elements with specified order', () => {
    immutaTest((input, path) => {
      const output = sort(input, path, (a, b) => b - a)
      expect(output).toEqual({
        nested: { prop: [4, 3, 2, 1] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [2, 4, 3, 1] },
      other: {},
    }, 'nested.prop')
  })

  it('should replace deep undefined with array', () => {
    immutaTest((input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should wrap value in an array', () => {
    immutaTest((input, path) => {
      const output = sort(input, path)
      expect(output).toEqual({ nested: { prop: [2] } })
      return output
    }, { nested: { prop: 2 } }, 'nested.prop')
  })
})
