/* eslint-env jest */
import concat from './concat'

describe('Concat', () => {

  it('should concat an array', () => {
    const original = { nested: { prop: [1, 2] } }

    const final = concat(original, 'nested.prop', [3, 4])

    expect(final).toEqual({ nested: { prop: [1, 2, 3, 4] } })
    expect(original).toEqual({ nested: { prop: [1, 2] } })
  })

  it('should add several arrays', () => {
    expect(concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4], [5, 6])).toEqual({ nested: { prop: [1, 2, 3, 4, 5, 6] } })
  })

  it('should replace value with array', () => {
    expect(concat({ nested: { prop: 1 } }, 'nested.prop', [2, 3])).toEqual({ nested: { prop: [1, 2, 3] } })
  })
})
