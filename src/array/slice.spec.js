/* eslint-env jest */
import { slice } from './slice'

describe('Slice', () => {

  it('should replace by a slice', () => {
    expect(slice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 3)).toEqual({ nested: { prop: [2, 3] } })
  })
})
