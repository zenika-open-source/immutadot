/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { take } from './take'

describe('Take', () => {

  it('should take one element', () => {
    immutaTest((input, path) => {
      const output = take(input, path, 1)
      expect(output).toEqual({
        nested: { prop: [1] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3] },
      other: {},
    }, 'nested.prop')
  })

  it('should replace deep undefined with array', () => {
    immutaTest((input, path) => {
      const output = take(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })
})
