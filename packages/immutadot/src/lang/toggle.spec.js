/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { toggle } from 'lang'
describe('lang.toggle', () => {
  const withTrue = {
    nested: { prop: true },
    other: {},
  }
  const withFalse = {
    nested: { prop: false },
    other: {},
  }
  it('should toggle false to true', () => {
    immutaTest(withFalse, ['nested.prop'], (input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual(withTrue)
      return output
    })
  })
  it('should toggle deep undefined to true', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual({ nested: { prop: true } })
      return output
    })
  })
  it('should toggle true to false', () => {
    immutaTest(withTrue, ['nested.prop'], (input, path) => {
      const output = toggle(input, path)
      expect(output).toEqual(withFalse)
      return output
    })
  })
})
