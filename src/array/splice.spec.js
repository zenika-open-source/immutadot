/* eslint-env jest */
import { splice } from './splice'

describe('Splice', () => {

  it('should replace two elements', () => {
    const original = { nested: { prop: [1, 2, 3, 4] } }

    const final = splice(original, 'nested.prop', 1, 2, 5, 6)

    expect(final).toEqual({ nested: { prop: [1, 5, 6, 4] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3, 4] } })
  })
})
