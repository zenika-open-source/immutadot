/* eslint-env jest */
import { pullAll } from './pullAll'

describe('PullAll', () => {

  it('should remove several matching elements', () => {
    expect(pullAll({ nested: { prop: [1, 2, 3, 1, 2, 3] } }, 'nested.prop', [1, 3])).toEqual({ nested: { prop: [2, 2] } })
  })
})
