/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { isString } from 'util/lang'
import { nav } from './nav'
import { toPath } from 'immutadot-parser'

describe('nav.nav', () => {
  function incV(v, i = 1) {
    let r = Number(v)
    if (Number.isNaN(r))
      r = 0
    return r + i
  }

  function uncurriedInc(obj, path, ...args) {
    return nav(toPath(path))(obj).update(v => incV(v, ...args))
  }

  function curriedInc(path, ...args) {
    return function(obj) {
      return uncurriedInc(obj, path, ...args)
    }
  }

  function inc(...args) {
    const [firstArg, ...argsRest] = args
    if (isString(firstArg)) return curriedInc(...args)
    return uncurriedInc(firstArg, ...argsRest)
  }

  it('should inc element at negative position in array', () => {
    immutaTest({ nested: { prop: [0, 1, 2, 3] } },
      ['nested.prop.3'],
      input => {
        const output = inc(input, 'nested.prop[-1]', 1)
        expect(output).toEqual({ nested: { prop: [0, 1, 2, 4] } })
        return output
      })
  })

  it('should inc in an array slice', () => {
    immutaTest({
      nested: {
        prop: [{
          val: 4,
          other: {},
        },
        { val: -8 },
        { val: 'a' },
        {},
        ],
      },
    }, [
      'nested.prop.0.val',
      'nested.prop.1.val',
      'nested.prop.2.val',
      'nested.prop.3.val',
    ], input => {
      const output = inc(input, 'nested.prop[:].val', 2)
      expect(output).toEqual({
        nested: {
          prop: [{
            val: 6,
            other: {},
          },
          { val: -6 },
          { val: 2 },
          { val: 2 },
          ],
        },
      })
      return output
    })
    immutaTest({
      nested: {
        prop: [{ val: 0 },
          {
            val: 1,
            other: {},
          },
          { val: 2 },
          { val: 3 },
        ],
      },
      other: {},
    }, [
      'nested.prop.1.val',
      'nested.prop.2.val',
    ], input => {
      const output = inc(input, 'nested.prop[1:3].val')
      expect(output).toEqual({
        nested: {
          prop: [{ val: 0 },
            {
              val: 2,
              other: {},
            },
            { val: 3 },
            { val: 3 },
          ],
        },
        other: {},
      })
      return output
    })
    immutaTest({
      nested: {
        prop: [{ val: 0 },
          {
            val: 1,
            other: {},
          },
          { val: 2 },
          { val: 3 },
        ],
      },
      other: {},
    }, [
      'nested.prop.1.val',
      'nested.prop.2.val',
    ], input => {
      const output = inc(input, 'nested.prop[-3:-1].val')
      expect(output).toEqual({
        nested: {
          prop: [{ val: 0 },
            {
              val: 2,
              other: {},
            },
            { val: 3 },
            { val: 3 },
          ],
        },
        other: {},
      })
      return output
    })
    immutaTest({
      nested: {
        prop: [{ val: 0 },
          { val: 1 },
        ],
      },
      other: {},
    }, [
      'nested.prop.2',
      'nested.prop.3.val',
      'nested.prop.4.val',
    ], input => {
      const output = inc(input, 'nested.prop[3:5].val', 6)
      expect(output).toEqual({
        nested: {
          prop: [{ val: 0 },
            { val: 1 },
            undefined,
            { val: 6 },
            { val: 6 },
          ],
        },
        other: {},
      })
      return output
    })
  })

  it('should inc in a list of props', () => {
    immutaTest({
      nested: {
        'prop1': { val: 0 },
        'prop2': { val: 5 },
        'prop{3}': { val: 5 },
        '"prop4"': { val: 3 },
        'prop5': { val: 5 },
      },
      other: {},
    }, [
      'nested.prop1.val',
      'nested.prop2.val',
      'nested.prop{3}.val',
      'nested."prop4".val',
    ], input => {
      const output = inc(input, 'nested.{prop1,prop2,"prop{3}",\'"prop4"\'}.val')
      expect(output).toEqual({
        nested: {
          'prop1': { val: 1 },
          'prop2': { val: 6 },
          'prop{3}': { val: 6 },
          '"prop4"': { val: 4 },
          'prop5': { val: 5 },
        },
        other: {},
      })
      return output
    })
  })

  it('should inc in all props', () => {
    immutaTest({
      nested: {
        'prop1': { val: 0 },
        'prop2': { val: 5 },
        'prop{3}': { val: 5 },
        '"prop4"': { val: 3 },
      },
      other: {},
    }, [
      'nested.prop1.val',
      'nested.prop2.val',
      'nested.prop{3}.val',
      'nested."prop4".val',
    ], input => {
      const output = inc(input, 'nested.{*}.val')
      expect(output).toEqual({
        nested: {
          'prop1': { val: 1 },
          'prop2': { val: 6 },
          'prop{3}': { val: 6 },
          '"prop4"': { val: 4 },
        },
        other: {},
      })
      return output
    })
  })

  it('should throw an explicit error when en empty path is given as parameter', () => {
    expect(() => inc({}, '')).toThrowError('path should not be empty')
  })

  it('should support curried first arg', () => {
    immutaTest({
      nested: { prop: 5 },
      other: {},
    }, ['nested.prop'], (input, [path]) => {
      const output = inc(path)(input, { shouldBeDiscarded: true })
      expect(output).toEqual({
        nested: { prop: 6 },
        other: {},
      })
      return output
    })
  })

  it('should initialize unknown props in a list', () => {
    immutaTest({
      nested: { prop1: { val: 5 } },
      other: {},
    }, [
      'nested.prop1.val',
      'nested.prop2.val',
    ], input => {
      const output = inc(input, 'nested.{prop1,prop2}.val')
      expect(output).toEqual({
        nested: {
          prop1: { val: 6 },
          prop2: { val: 1 },
        },
        other: {},
      })
      return output
    })
  })

  it('should get a nested prop', () => {
    expect(nav(toPath('nested.prop'))({ nested: { prop: 'foo' } }).get()).toBe('foo')
  })

  it('should get a list of props', () => {
    expect(nav(toPath('nested.{prop1,prop2}'))({ nested: { prop1: 'foo',
      prop2: 'bar' } }).get()).toEqual(['foo', 'bar'])
    expect(nav(toPath('nested.{*}'))({ nested: { prop1: 'foo',
      prop2: 'bar' } }).get()).toEqual(['foo', 'bar'])
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
    expect(nav(toPath('nested.prop[::-1].val'))({
      nested: {
        prop: [
          { val: 'foo' },
          { val: 'bar' },
        ],
      },
    }).get()).toEqual(['bar', 'foo'])
  })

  it('should get a negative array index', () => {
    expect(nav(toPath('nested.prop[-3]'))({ nested: { prop: [0, 1, 2, 3, 4] } }).get()).toBe(2)
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
