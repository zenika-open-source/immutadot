/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { set } from 'core'

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

  it('should set a value in an array', () => {
    immutaTest(input => {
      const output = set(input, 'nested.prop[0]', 'final')
      expect(output).toEqual({
        nested: { prop: ['final', 'other'] },
        other: {},
      })
      return output
    }, {
      nested: { prop: ['initial', 'other'] },
      other: {},
    }, 'nested.prop.0')
  })

  it('should set a deep undefined prop', () => {
    immutaTest((input, path) => {
      const output = set(input, path, 'final')
      expect(output).toEqual({ nested: { prop: 'final' } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should set a deep undefined prop within an array', () => {
    immutaTest(input => {
      const output = set(input, 'nested.prop[0]', 'final')
      expect(output).toEqual({
        nested: { prop: ['final'] },
        other: {},
      })
      return output
    }, { other: {} }, 'nested.prop.0')
  })
})
