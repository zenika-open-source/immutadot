/* eslint-env jest */
import { filter } from 'array'
import { immutaTest } from 'test.utils'

describe('array.filter', () => {

  it('should filter elements', () => {
    immutaTest((input, path) => {
      const output = filter(input, path, v => v % 2 === 0)
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

  it('should replace deep undefined with array', () => {
    immutaTest((input, path) => {
      const output = filter(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should wrap value in an array', () => {
    immutaTest((input, path) => {
      const output = filter(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [2] } })
      return output
    }, { nested: { prop: 2 } }, 'nested.prop')
  })
})
