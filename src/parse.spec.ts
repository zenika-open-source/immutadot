import Parser from './parse'
import { NavigatorType } from './path'

describe('Parser', () => {
  it('should parse prop navigators', () => {
    expect([...new Parser('.foo.bar.baz')]).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
      [NavigatorType.Prop, 'baz'],
    ])
  })

  it('should parse index navigators', () => {
    expect([...new Parser('[1][2][3]')]).toEqual([
      [NavigatorType.Index, 1],
      [NavigatorType.Index, 2],
      [NavigatorType.Index, 3],
    ])
  })
})
