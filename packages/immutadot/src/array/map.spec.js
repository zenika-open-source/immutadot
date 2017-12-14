/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { map } from 'array'

describe('array.map', () => {

  it('should map elements', () => {
    immutaTest((input, path) => {
      const output = map(input, path, v => v * v)
      expect(output).toEqual({
        nested: { prop: [1, 4, 9, 16] },
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
      const output = map(input, path, v => v)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should wrap value in an array', () => {
    immutaTest((input, path) => {
      const output = map(input, path, v => v * v)
      expect(output).toEqual({ nested: { prop: [4] } })
      return output
    }, { nested: { prop: 2 } }, 'nested.prop')
  })
})
