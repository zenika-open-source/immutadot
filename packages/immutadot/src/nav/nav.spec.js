/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { nav } from './nav'
import { toPath } from '@immutadot/parser'

describe('nav.nav', () => {
  it('should get a nested prop', () => {
    expect(nav(toPath('nested.prop'))({ nested: { prop: 'foo' } })()).toBe('foo')
  })

  it('should set a nested prop', () => {
    immutaTest(
      { nested: { prop: 'foo' } },
      ['nested.prop'],
      (input, [path]) => {
        const output = nav(toPath(path))(input)(() => 'bar')
        expect(output).toEqual({ nested: { prop: 'bar' } })
        return output
      },
    )
  })

  it('should update a nested prop', () => {
    immutaTest(
      { nested: { prop: 'foo' } },
      ['nested.prop'],
      (input, [path]) => {
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

  it('should get a slice', () => {
    expect(nav(toPath('nested.prop[:].val'))({
      nested: {
        prop: [
          { val: 'foo' },
          { val: 'bar' },
        ],
      },
    })()).toEqual(['foo', 'bar'])
  })

  it('should update a slice', () => immutaTest(
    {
      nested: {
        prop: [
          { val: 'foo' },
          { val: 'bar' },
          { val: 'baz' },
        ],
      },
    },
    ['nested.prop.1.val', 'nested.prop.2.val'],
    input => {
      const output = nav(toPath('nested.prop[-2:].val'))(input)(value => value.toUpperCase())
      expect(output).toEqual({
        nested: {
          prop: [
            { val: 'foo' },
            { val: 'BAR' },
            { val: 'BAZ' },
          ],
        },
      })
      return output
    },
  ))
})
