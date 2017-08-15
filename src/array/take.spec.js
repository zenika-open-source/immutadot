/* eslint-env jest */
import { take } from './take'

describe('Take', () => {

  it('should take one element', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = take(original, 'nested.prop', 1)

    expect(final).toEqual({ nested: { prop: [1] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should replace deep undefined with array', () => {
    expect(take(undefined, 'nested.prop', () => true)).toEqual({ nested: { prop: [] } })
  })
})
