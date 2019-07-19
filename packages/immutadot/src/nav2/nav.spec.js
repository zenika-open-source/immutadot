/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { nav } from './nav'

describe('nav.nav', () => {
  it('should update a nested prop', () => immutaTest(
    {
      nested: { prop: 'foo' },
      other: { prop: 'baz' },
    },
    ['nested.prop'],
    input => {
      const output = nav([['prop', 'nested'], ['prop', 'prop']])('update')(() => 'bar')(input)
      expect(output).toEqual({
        nested: { prop: 'bar' },
        other: { prop: 'baz' },
      })
      return output
    },
  ))

  it('should get a nested prop', () => {
    const input = {
      nested: { prop: 'foo' },
      other: { prop: 'baz' },
    }
    expect(nav([['prop', 'nested'], ['prop', 'prop']])('get')()(input)).toEqual('foo')
  })
})
