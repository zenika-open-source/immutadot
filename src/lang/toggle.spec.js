/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toggle } from './toggle'

describe('Toggle', () => {

  const withTrue = {
    nested: { prop: true },
    other: {},
  }
  const withFalse = {
    nested: { prop: false },
    other: {},
  }

  it('should toggle false to true', () => {
    immutaTest((input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual(withTrue)
      return output
    }, withFalse, 'nested.prop')
  })

  it('should toggle deep undefined to true', () => {
    immutaTest((input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual({ nested: { prop: true } })
      return output
    }, undefined, 'nested.prop')
  })

  it('should toggle true to false', () => {
    immutaTest((input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual(withFalse)
      return output
    }, withTrue, 'nested.prop')
  })
})
