/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { or } from 'lang'

describe('lang.or', () => {

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
      const output = or(input, 'nested.prop')
      expect(output).toEqual(withTrue)
      return output
    }, withTrue, 'nested')
  })

  it('should stay true', () => {
    immutaTest(input => {
      const output = or(input, 'nested.prop', true)
      expect(output).toEqual(withTrue)
      return output
    }, withTrue, 'nested')
  })

  it('should set deep undefined to undefined', () => {
    immutaTest((input, path) => {
      const output = or(input, path)
      expect(output).toEqual({ nested: { prop: undefined } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should stay true', () => {
    immutaTest(input => {
      const output = or(input, 'nested.prop', false)
      expect(output).toEqual(withTrue)
      return output
    }, withTrue, 'nested')
  })

  it('should set to true', () => {
    immutaTest((input, path) => {
      const output = or(input, path, true)
      expect(output).toEqual(withTrue)
      return output
    }, withFalse, 'nested.prop')
  })

  it('should set to false', () => {
    immutaTest((input, path) => {
      const output = or(input, path, true, false)
      expect(output).toEqual(withTrue)
      return output
    }, withFalse, 'nested.prop')
  })
})
