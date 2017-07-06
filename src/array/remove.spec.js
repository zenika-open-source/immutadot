/* eslint-env jest */
import remove from './remove'

describe('Drop', () => {

  it('should remove an element', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = remove(original, 'nested.prop', v => v > 2)

    expect(final).toEqual({ nested: { prop: [1, 2] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should replace deep undefined with array', () => {
    expect(remove(undefined, 'nested.prop', () => true)).toEqual({ nested: { prop: [] } })
  })
})
