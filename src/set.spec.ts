import set from './set'

describe('Set', () => {
  it('should set a nested property', () => {
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
})
