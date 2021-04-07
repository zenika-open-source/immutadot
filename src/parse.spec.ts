import { parse } from './parse'
import { NavigatorType, NavigatorVariableType } from './path'

describe('parse', () => {
  it('should parse prop navigators', () => {
    expect(parse(['.foo?.bar.baz'])).toEqual([
      [NavigatorType.PropIndex, 'foo', false],
      [NavigatorType.PropIndex, 'bar', true],
      [NavigatorType.PropIndex, 'baz', false],
    ])
    expect(parse(['?.["foo"][\'bar\']'])).toEqual([
      [NavigatorType.PropIndex, 'foo', true],
      [NavigatorType.PropIndex, 'bar', false],
    ])
  })

  it('should parse interpolated props', () => {
    expect(parse(['[', ']?.[', ']'])).toEqual([
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 0], false],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 1], true],
    ])
  })

  it('should parse indexes', () => {
    expect(parse(['[1][2]?.[3]'])).toEqual([
      [NavigatorType.PropIndex, 1, false],
      [NavigatorType.PropIndex, 2, false],
      [NavigatorType.PropIndex, 3, true],
    ])
  })

  it('should parse negative indexes as properties', () => {
    expect(parse(['?.[-1]?.[- 2][-3]'])).toEqual([
      [NavigatorType.PropIndex, -1, true],
      [NavigatorType.PropIndex, -2, true],
      [NavigatorType.PropIndex, -3, false],
    ])
  })

  it('should parse interpolated indexes', () => {
    expect(parse(['[', ']?.[', ']?.[', ']'])).toEqual([
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 0], false],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 1], true],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 2], true],
    ])
  })

  it('should parse slices', () => {
    expect(parse(['[1:2][3:][:4][:]'])).toEqual([
      [NavigatorType.Slice, 1, 2, false],
      [NavigatorType.Slice, 3, undefined, false],
      [NavigatorType.Slice, undefined, 4, false],
      [NavigatorType.Slice, undefined, undefined, false],
    ])
  })

  it('should parse negative slices', () => {
    expect(parse(['[-1:-2][-3:][:-4][:][5:-6][-7:8]'])).toEqual([
      [NavigatorType.Slice, -1, -2, false],
      [NavigatorType.Slice, -3, undefined, false],
      [NavigatorType.Slice, undefined, -4, false],
      [NavigatorType.Slice, undefined, undefined, false],
      [NavigatorType.Slice, 5, -6, false],
      [NavigatorType.Slice, -7, 8, false],
    ])
  })
})
