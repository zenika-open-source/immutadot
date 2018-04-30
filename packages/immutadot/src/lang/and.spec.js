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
    immutaTest(withTrue, ['nested'], input => {
      const output = and(input, 'nested.prop')
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should stay true', () => {
    immutaTest(withTrue, ['nested'], input => {
      const output = and(input, 'nested.prop', true)
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should set deep undefined to undefined', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = and(input, path)
      expect(output).toEqual({ nested: { prop: undefined } })
      return output
    })
  })
  it('should set to false', () => {
    immutaTest(withTrue, ['nested.prop'], (input, path) => {
      const output = and(input, path, false)
      expect(output).toEqual(withFalse)
      return output
    })
  })
  it('should stay false', () => {
    immutaTest(withFalse, ['nested'], input => {
      const output = and(input, 'nested.prop', true)
      expect(output).toEqual(withFalse)
      return output
    })
  })
  it('should set to false', () => {
    immutaTest(withTrue, ['nested.prop'], (input, path) => {
      const output = and(input, path, true, false)
      expect(output).toEqual(withFalse)
      return output
    })
  })
})
