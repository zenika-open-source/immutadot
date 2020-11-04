import Parser from './parser'
import { NavigatorType } from './path'

describe('Parser', () => {
  it('should parse prop navigators', () => {
    expect([...new Parser('.foo.bar.baz')]).toEqual([
      [NavigatorType.Prop, 'foo'],
      [NavigatorType.Prop, 'bar'],
      [NavigatorType.Prop, 'baz'],
    ])
  })
})
