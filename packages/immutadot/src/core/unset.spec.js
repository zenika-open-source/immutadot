/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { unset } from 'core'

describe('core.unset', () => {

  it('should unset a prop', () => {
    immutaTest((input, path) => {
      const output = unset(input, path)
      expect(output).toEqual({
        nested: {},
        other: {},
      })
      return output
    }, {
      nested: { prop: 'initial' },
      other: {},
    }, 'nested.prop')
  })
})
