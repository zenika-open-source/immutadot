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
    immutaTest(withTrue, ['nested'], input => {
      const output = or(input, 'nested.prop')
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should stay true', () => {
    immutaTest(withTrue, ['nested'], input => {
      const output = or(input, 'nested.prop', true)
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should set deep undefined to undefined', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = or(input, path)
      expect(output).toEqual({ nested: { prop: undefined } })
      return output
    })
  })
  it('should stay true', () => {
    immutaTest(withTrue, ['nested'], input => {
      const output = or(input, 'nested.prop', false)
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should set to true', () => {
    immutaTest(withFalse, ['nested.prop'], (input, path) => {
      const output = or(input, path, true)
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should set to false', () => {
    immutaTest(withFalse, ['nested.prop'], (input, path) => {
      const output = or(input, path, true, false)
      expect(output).toEqual(withTrue)
      return output
    })
  })
})
