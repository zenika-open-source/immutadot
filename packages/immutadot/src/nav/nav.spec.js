/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { nav } from './nav'
import { toPath } from '@immutadot/parser'

describe('nav.nav', () => {
  it('should get a nested prop', () => {
    expect(nav(toPath('nested.prop'))({ nested: { prop: 'foo' } }).get()).toBe('foo')
  })

  it('should set a nested prop', () => {
    immutaTest(
      { nested: { prop: 'foo' } },
      ['nested.prop'],
      (input, [path]) => {
        const output = nav(toPath(path))(input).update(() => 'bar')
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
        const output = nav(toPath(path))(input).update(value => value.toUpperCase())
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
        const output = nav(toPath('nested.prop[1]'))(input).update(() => 'foo')
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
    }).get()).toEqual(['foo', 'bar'])
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
      const output = nav(toPath('nested.prop[-2:].val'))(input).update(value => value.toUpperCase())
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
