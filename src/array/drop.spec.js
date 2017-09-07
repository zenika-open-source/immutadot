/* eslint-env jest */
import { drop } from 'array'
import { immutaTest } from 'test.utils'

describe('Drop', () => {

  it('should drop an element at the start of the array', () => {
    immutaTest((input, path) => {
      const output = drop(input, path)
      expect(output).toEqual({
        nested: { prop: [2, 3] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3] },
      other: {},
    }, 'nested.prop')
  })

  it('should drop several elements at the start of the array', () => {
    immutaTest((input, path) => {
      const output = drop(input, path, 2)
      expect(output).toEqual({
        nested: { prop: [3, 4] },
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
      const output = drop(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })
})
