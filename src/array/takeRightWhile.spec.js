/* eslint-env jest */
import takeRightWhile from './takeRightWhile'

describe('TakeRight', () => {

  it('should take one element at the end of the array', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = takeRightWhile(original, 'nested.prop', v => v > 2)

    expect(final).toEqual({ nested: { prop: [3] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should replace deep undefined with array', () => {
    expect(takeRightWhile(undefined, 'nested.prop', () => true)).toEqual({ nested: { prop: [] } })
  })
})
