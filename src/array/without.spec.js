/* eslint-env jest */
import { without } from './without'

describe('Without', () => {

  it('should remove several matching elements', () => {
    expect(without({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', 1, 3)).toEqual({ nested: { prop: [2, 2] } })
  })
})
