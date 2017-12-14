/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pop } from 'array'

describe('array.pop', () => {

  it('should remove an element at the end', () => {
    immutaTest((input, path) => {
      const output = pop(input, path)
      expect(output).toEqual({
        nested: { prop: [1, 2, 3] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })

  it('should wrap and remove an element', () => {
    immutaTest((input, path) => {
      const output = pop(input, path)
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

  it('should replace deep undefined with array', () => {
    immutaTest((input, path) => {
      const output = pop(input, path, () => true)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should wrap value in array and remove it', () => {
    immutaTest((input, path) => {
      const output = pop(input, path)
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
