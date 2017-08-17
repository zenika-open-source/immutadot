/* eslint-env jest */
import { pullAllBy } from './pullAllBy'

describe('PullAllBy', () => {

  it('should remove several matching elements', () => {
    expect(pullAllBy({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], 'x')).toEqual({ nested: { prop: [{ x: 2 }, { x: 2 }] } })
  })
})
