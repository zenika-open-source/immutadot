import { recurFreeze } from '../recurFreeze'
import set from './set'

describe('Set', () => {
  it('should set a nested property (prop navigators only)', () => {
    const o = recurFreeze({
      nested: {
        property: 'foo',
      },
    })

    expect(set`${o}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
      },
    })
  })

  it('should set a nested array index (index navigators only)', () => {
    const a = recurFreeze([
      'foo',
      ['bar', 'baz', 'qwe'],
      'plop',
    ])

    expect(set`${a}[1][2]`('aze')).toEqual([
      'foo',
      ['bar', 'baz', 'aze'],
      'plop',
    ])
  })
})
