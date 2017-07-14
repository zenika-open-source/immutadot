/* eslint-env jest */
import takeWhile from './takeWhile'

describe('TakeRight', () => {

  it('should take one element at the beginning of the array', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = takeWhile(original, 'nested.prop', v => v < 2)

    expect(final).toEqual({ nested: { prop: [1] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should replace deep undefined with array', () => {
    expect(takeWhile(undefined, 'nested.prop', () => true)).toEqual({ nested: { prop: [] } })
  })
})
