/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { map } from './map'

describe('Map', () => {

  it('should map an array', () => {
    immutaTest((input, path) => {
      const output = map(input, path, v => v * 2)
      expect(output).toEqual({
        nested: { prop: [2, 4] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2] },
      other: {},
    }, 'nested.prop')
  })

  it('should replace deep undefined with empty array', () => {
    immutaTest((input, path) => {
      const output = map(input, path)
      expect(output).toEqual({ nested: { prop: [] } })
      return output
    }, undefined, 'nested.prop')
  })
})
