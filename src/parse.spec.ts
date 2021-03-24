import { parse } from './parse'
import { NavigatorType, NavigatorVariableType } from './path'

describe('parse', () => {
  it('should parse prop navigators', () => {
    expect(parse(['.foo.bar.baz'])).toEqual([
      [NavigatorType.PropIndex, 'foo'],
      [NavigatorType.PropIndex, 'bar'],
      [NavigatorType.PropIndex, 'baz'],
    ])
    expect(parse(['["foo"][\'bar\']'])).toEqual([
      [NavigatorType.PropIndex, 'foo'],
      [NavigatorType.PropIndex, 'bar'],
    ])
  })

  it('should parse interpolated props', () => {
    expect(parse(['[', '][', ']'])).toEqual([
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 1]],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 2]],
    ])
  })

  it('should parse indexes', () => {
    expect(parse(['[1][2][3]'])).toEqual([
      [NavigatorType.PropIndex, 1],
      [NavigatorType.PropIndex, 2],
      [NavigatorType.PropIndex, 3],
    ])
  })

  it('should parse negative indexes as properties', () => {
    expect(parse(['[-1][- 2][-3]'])).toEqual([
      [NavigatorType.PropIndex, -1],
      [NavigatorType.PropIndex, -2],
      [NavigatorType.PropIndex, -3],
    ])
  })

  it('should parse interpolated indexes', () => {
    expect(parse(['[', '][', '][', ']'])).toEqual([
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 1]],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 2]],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 3]],
    ])
  })

  it('should parse negative interpolated indexes as properties', () => {
    expect(parse(['[', '][', '][', ']'])).toEqual([
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 1]],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 2]],
      [NavigatorType.PropIndex, [NavigatorVariableType.Argument, 3]],
    ])
  })

  it('should parse slices', () => {
    expect(parse(['[1:2][3:][:4][:]'])).toEqual([
      [NavigatorType.Slice, 1, 2],
      [NavigatorType.Slice, 3, undefined],
      [NavigatorType.Slice, undefined, 4],
      [NavigatorType.Slice, undefined, undefined],
    ])
  })

  it('should parse negative slices', () => {
    expect(parse(['[-1:-2][-3:][:-4][:][5:-6][-7:8]'])).toEqual([
      [NavigatorType.Slice, -1, -2],
      [NavigatorType.Slice, -3, undefined],
      [NavigatorType.Slice, undefined, -4],
      [NavigatorType.Slice, undefined, undefined],
      [NavigatorType.Slice, 5, -6],
      [NavigatorType.Slice, -7, 8],
    ])
  })
})
