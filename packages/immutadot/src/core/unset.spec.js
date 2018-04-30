/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { unset } from 'core'
describe('core.unset', () => {
  it('should unset a prop', () => {
    immutaTest({
      nested: { prop: 'initial' },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = unset(input, path)
      expect(output).toEqual({
        nested: {},
        other: {},
      })
      return output
    })
  })
})
