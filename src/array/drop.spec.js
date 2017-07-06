/* eslint-env jest */
import drop from './drop'

describe('Drop', () => {

  it('should drop an element at the start of the array', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = drop(original, 'nested.prop')

    expect(final).toEqual({ nested: { prop: [2, 3] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should drop several elements at the start of the array', () => {
    expect(drop({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 2)).toEqual({ nested: { prop: [3, 4] } })
  })

  it('should replace deep undefined with array', () => {
    expect(drop(undefined, 'nested.prop')).toEqual({ nested: { prop: [] } })
  })
})
