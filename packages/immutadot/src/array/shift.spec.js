/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { shift } from 'array'

describe('array.shift', () => {

  it('should remove first element', () => {
    immutaTest((input, path) => {
      const output = shift(input, path)
      expect(output).toEqual({
        nested: { prop: [2, 3, 4] },
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
      const output = shift(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should wrap value in array and remove it', () => {
    immutaTest((input, path) => {
      const output = shift(input, path)
      expect(output).toEqual({
        nested: { prop: [] },
        other: {},
      })
      return output
    }, {
      nested: { prop: 123 },
      other: {},
    }, 'nested.prop')
  })
})
