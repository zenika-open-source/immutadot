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

  it('should set values in an array slice', () => {
    immutaTest(input => {
      const output = set(input, 'nested.prop[:]', 'final')
      expect(output).toEqual({
        nested: { prop: ['final', 'final', 'final'] },
        other: {},
      })
      return output
    }, {
      nested: { prop: ['a', 'b', 'c'] },
      other: {},
    }, 'nested.prop')

    immutaTest(input => {
      const output = set(input, 'nested.prop[1:3].val', 'final')
      expect(output).toEqual({
        nested: { prop: [{ val: 'a' }, { val: 'final' }, { val: 'final' }, { val: 'd' }] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [{ val: 'a' }, { val: 'b' }, { val: 'c' }, { val: 'd' }] },
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
