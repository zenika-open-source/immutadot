/* eslint-env jest */
import { difference } from './difference'

describe('Difference', () => {

  it('should remove intersecting elements', () => {
    const original = { nested: { prop: [1, 2, 3] } }

    const final = difference(original, 'nested.prop', [3, 4])

    expect(final).toEqual({ nested: { prop: [1, 2] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3] } })
  })

  it('should remove intersecting elements from several arrays', () => {
    expect(difference({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', [1], [2])).toEqual({ nested: { prop: [3, 4] } })
  })

  it('should replace deep undefined with array', () => {
    expect(difference(undefined, 'nested.prop', [1, 2])).toEqual({ nested: { prop: [] } })
  })
})
