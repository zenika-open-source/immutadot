/* eslint-env jest */
import { takeRight } from './takeRight'

describe('TakeRight', () => {

  it('should take one element at the end of the array', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = takeRight(original, 'nested.prop', 1)

    expect(final).toEqual({ nested: { prop: [3] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should replace deep undefined with array', () => {
    expect(takeRight(undefined, 'nested.prop', () => true)).toEqual({ nested: { prop: [] } })
  })
})
