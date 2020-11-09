import set from './set'

describe('Set', () => {
  it('should set a nested property (prop navigators only)', () => {
    const o = {
      nested: {
        property: 'foo',
      },
    }
    Object.freeze(o)
    Object.freeze(o.nested)

    expect(set`${o}.nested.property`('bar')).toEqual({
      nested: {
        property: 'bar',
      },
    })
  })

  it('should set a nested array index (index navigators only)', () => {
    const a = [
      'foo',
      ['bar', 'baz', 'qwe'],
      'plop',
    ]
    Object.freeze(a)
    Object.freeze(a[1])

    expect(set`${a}[1][2]`('aze')).toEqual([
      'foo',
      ['bar', 'baz', 'aze'],
      'plop',
    ])
  })
})
