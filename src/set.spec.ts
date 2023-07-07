import { expect, describe, it } from 'vitest'

import { recurFreeze } from '../recurFreeze'
import { set } from './set'

describe('Set', () => {
  it('should set a nested property (prop navigators only)', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(set`${o}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
        otherProperty: 'baz',
      },
    })
  })

  it('should set a nested array index (index navigators only)', () => {
    const a = recurFreeze(['foo', ['bar', 'baz', 'qwe'], 'plop'])

    expect(set`${a}[1][${2}]`('aze')).toEqual(['foo', ['bar', 'baz', 'aze'], 'plop'])
  })

  it('should create missing objects for prop navigators', () => {
    expect(set`${undefined}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
      },
    })
  })

  it('should not create missing objects for optional prop navigators', () => {
    expect(set`${undefined}?.nested.property`('bar')).toBeUndefined()
    expect(set`${undefined}.nested?.property`('bar')).toBeUndefined()
    const oUndefined = recurFreeze({ nested: undefined })
    expect(set`${oUndefined}.nested?.property`('bar')).toBe(oUndefined)
    const oNull = recurFreeze({ nested: null })
    expect(set`${oNull}.nested?.property`('bar')).toBe(oNull)
  })

  it('should create missing arrays for index navigators', () => {
    expect(set`${undefined}[1][2]`('aze')).toEqual([undefined, [undefined, undefined, 'aze']])
  })

  it('should not create missing arrays for optional index navigators', () => {
    expect(set`${undefined}?.[1][2]`('aze')).toBeUndefined()
    expect(set`${undefined}[1]?.[2]`('aze')).toBeUndefined()
    const aUndefined = recurFreeze([undefined, undefined])
    expect(set`${aUndefined}[1]?.[2]`('aze')).toBe(aUndefined)
    const aNull = recurFreeze([null, null])
    expect(set`${aNull}[1]?.[2]`('aze')).toBe(aNull)
  })

  it('should create empty array for slice navigators', () => {
    expect(set`${undefined}[:].property`('aze')).toEqual([])
    expect(set`${recurFreeze({ nested: undefined })}.nested[:].property`('aze')).toEqual({
      nested: [],
    })
  })

  it('should not create empty array for optional slice navigators', () => {
    expect(set`${undefined}?.[:].property`('aze')).toBeUndefined()
    const o = recurFreeze({ nested: undefined })
    expect(set`${o}.nested?.[:].property`('aze')).toBe(o)
  })

  it('should support Symbol properties', () => {
    const nested = Symbol('nested')
    const property = Symbol('property')
    const o = recurFreeze({
      [nested]: {
        [property]: 'foo',
        otherProperty: 'baz',
      },
    })

    expect(set`${o}[${nested}][${property}]`('bar')).toEqual({
      [nested]: {
        [property]: 'bar',
        otherProperty: 'baz',
      },
    })
  })

  it('should support array slices', () => {
    const a = recurFreeze(['foo', ['bar', 'baz', 'qwe'], 'plop'])

    expect(set`${a}[1][1:3]`('aze')).toEqual(['foo', ['bar', 'aze', 'aze'], 'plop'])

    expect(set`${a}[1][:2]`('aze')).toEqual(['foo', ['aze', 'aze', 'qwe'], 'plop'])

    expect(set`${a}[1][2:]`('aze')).toEqual(['foo', ['bar', 'baz', 'aze'], 'plop'])

    expect(set`${a}[1][:]`('aze')).toEqual(['foo', ['aze', 'aze', 'aze'], 'plop'])

    expect(set`${a}[1][${1}:${3}]`('aze')).toEqual(['foo', ['bar', 'aze', 'aze'], 'plop'])
  })

  it('should support negative array slices', () => {
    const a = recurFreeze(['foo', ['bar', 'baz', 'qwe'], 'plop'])

    expect(set`${a}[1][-3:-1]`('aze')).toEqual(['foo', ['aze', 'aze', 'qwe'], 'plop'])

    expect(set`${a}[1][:-2]`('aze')).toEqual(['foo', ['aze', 'baz', 'qwe'], 'plop'])

    expect(set`${a}[1][-2:]`('aze')).toEqual(['foo', ['bar', 'aze', 'aze'], 'plop'])

    expect(set`${a}[1][-4:-1]`('aze')).toEqual(['foo', ['aze', 'aze', 'qwe'], 'plop'])
  })

  it('should throw an error for slice on non array', () => {
    expect(() => set`${recurFreeze({})}[:]`('foo')).toThrow(TypeError)
  })

  it('should throw an error for non integers slice bounds', () => {
    expect(() => set`${recurFreeze([])}[${{}}:]`('foo')).toThrow(TypeError)
    expect(() => set`${recurFreeze([])}[:${'foo'}]`('foo')).toThrow(TypeError)
    expect(() => set`${recurFreeze([])}[${0.5}:]`('foo')).toThrow(TypeError)
    expect(() => set`${recurFreeze([])}[:${'0'}]`('foo')).toThrow(TypeError)
  })
})
