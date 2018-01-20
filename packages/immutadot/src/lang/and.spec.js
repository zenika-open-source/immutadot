/* eslint-env jest */
import { and } from 'lang'
import { immutaTest } from 'test.utils'

describe('lang.and', () => {

  const withTrue = {
    nested: { prop: true },
    other: {},
  }
  const withFalse = {
    nested: { prop: false },
    other: {},
  }

  it('should stay true', () => {
    immutaTest(input => {
      const output = and(input, 'nested.prop')
      expect(output).toEqual(withTrue)
      return output
    }, withTrue, 'nested')
  })

  it('should stay true', () => {
    immutaTest(input => {
      const output = and(input, 'nested.prop', true)
      expect(output).toEqual(withTrue)
      return output
    }, withTrue, 'nested')
  })

  it('should set deep undefined to undefined', () => {
    immutaTest((input, path) => {
      const output = and(input, path)
      expect(output).toEqual({ nested: { prop: undefined } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should set to false', () => {
    immutaTest((input, path) => {
      const output = and(input, path, false)
      expect(output).toEqual(withFalse)
      return output
    }, withTrue, 'nested.prop')
  })

  it('should stay false', () => {
    immutaTest(input => {
      const output = and(input, 'nested.prop', true)
      expect(output).toEqual(withFalse)
      return output
    }, withFalse, 'nested')
  })

  it('should set to false', () => {
    immutaTest((input, path) => {
      const output = and(input, path, true, false)
      expect(output).toEqual(withFalse)
      return output
    }, withTrue, 'nested.prop')
  })
})
