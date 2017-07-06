/* eslint-env jest */
import pull from './pull'

describe('Pull', () => {

  it('should remove matching elements', () => {
    const original = { nested: { prop: [1, 2, 3, 1, 2, 3] } }

    const final = pull(original, 'nested.prop', 2)

    expect(final).toEqual({ nested: { prop: [1, 3, 1, 3] } })
    expect(original).toEqual({ nested: { prop: [1, 2, 3, 1, 2, 3] } })
  })

  it('should remove several matching elements', () => {
    expect(pull({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', 1, 3)).toEqual({ nested: { prop: [2, 2] } })
  })
})
