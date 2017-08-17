/* eslint-env jest */
import { pullAllWith } from './pullAllWith'

describe('PullAll', () => {

  it('should remove several matching elements', () => {
    expect(pullAllWith({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop', [{ x: 1 }, { x: 3 }], (a, b) => a.x === b.x)).toEqual({ nested: { prop: [{ x: 2 }, { x: 2 }] } })
  })
})
