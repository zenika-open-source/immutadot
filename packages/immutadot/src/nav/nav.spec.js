/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { nav } from './nav'
import { toPath } from '@immutadot/parser'

describe('nav.nav', () => {
  const obj = { nested: { prop: 'foo' } }
  const path = 'nested.prop'

  it('should allow to get a nested prop', () => {
    expect(nav(toPath(path))(obj)()).toBe('foo')
  })

  it('should allow to set a nested prop', () => {
    immutaTest(
      obj,
      [path],
      input => {
        const output = nav(toPath(path))(input)(() => 'bar')
        expect(output).toEqual({ nested: { prop: 'bar' } })
        return output
      },
    )
  })

  it('should allow to update a nested prop', () => {
    immutaTest(
      obj,
      [path],
      input => {
        const output = nav(toPath(path))(input)(value => value.toUpperCase())
        expect(output).toEqual({ nested: { prop: 'FOO' } })
        return output
      },
    )
  })

  it('should create unknown path', () => {
    immutaTest(
      {},
      ['nested.prop.0', 'nested.prop.1'],
      input => {
        const output = nav(toPath('nested.prop[1]'))(input)(() => 'foo')
        expect(output).toEqual({ nested: { prop: [undefined, 'foo'] } })
        return output
      },
    )
  })
})
