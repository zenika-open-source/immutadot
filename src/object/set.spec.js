/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { set } from './set'

describe('Set', () => {

  it('should set a prop', () => {
    immutaTest((input, path) => {
      const output = set(input, path, 'final')
      expect(output).toEqual({
        nested: { prop: 'final' },
        other: {},
      })
      return output
    }, {
      nested: { prop: 'initial' },
      other: {},
    }, 'nested.prop')
  })

  it('should set a deep undefined prop', () => {
    immutaTest((input, path) => {
      const output = set(input, path, 'final')
      expect(output).toEqual({ nested: { prop: 'final' } })
      return output
    }, undefined, 'nested.prop')
  })
})
