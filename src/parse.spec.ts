import { parse } from './parse'
import { NavigatorType } from './path'

describe('parse', () => {
  it('should parse prop navigators', () => {
    expect(parse(['.foo.bar.baz'], [])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
      [NavigatorType.Prop, 'baz'],
    ])
    expect(parse(['["foo"][\'bar\']'], [])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
    ])
  })

  it('should parse interpolated navigators', () => {
    const bar = Symbol('bar')
    expect(parse(['[', '][', ']'], ['foo', bar])).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, bar],
    ])
  })

  it('should parse index navigators', () => {
    expect(parse(['[1][2][3]'], [])).toEqual([
      [NavigatorType.Index, 1],
      [NavigatorType.Index, 2],
      [NavigatorType.Index, 3],
    ])
  })

  it('should parse interpolated indexes', () => {
    expect(parse(['[', '][', '][', ']'], [1, 2, 3])).toEqual([
      [NavigatorType.Index, 1],
      [NavigatorType.Index, 2],
      [NavigatorType.Index, 3],
    ])
  })
})
