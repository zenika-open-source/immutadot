/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { set } from 'core'

describe('Set', () => {
  it('should set nested property value', () => {
    immutaTest((input, path) => {
      const output = set(input, path, 'bar')
      expect(output).toEqual({
        nested: { prop: 'bar' },
        nested2: { prop: 123 },
      })
      return output
    }, {
      nested: { prop: 'foo' },
      nested2: { prop: 123 },
    }, 'nested.prop')

    immutaTest(input => {
      const output = set(input, 'nested.prop[0]', 'qwe')
      expect(output).toEqual({
        nested: { prop: ['qwe', 'rty'] },
        nested2: { prop: 123 },
      })
      return output
    }, {
      nested: { prop: ['aze', 'rty'] },
      nested2: { prop: 123 },
    }, 'nested.prop.0')

    immutaTest((input, path) => {
      const output = set(input, path, 'foo')
      expect(output).toEqual({
        nested: { prop: 'foo' },
        nested2: { prop: 123 },
      })
      return output
    }, { nested2: { prop: 123 } }, 'nested.prop')

    immutaTest(input => {
      const output = set(input, 'nested.prop[0]', 'qwe')
      expect(output).toEqual({
        nested: { prop: ['qwe'] },
        nested2: { prop: 123 },
      })
      return output
    }, { nested2: { prop: 123 } }, 'nested.prop.0')
  })
})
