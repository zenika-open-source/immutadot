/* eslint-env jest */
import { intersectionWith } from './intersectionWith'

describe('IntersectionWith', () => {

  it('should replace by intersection of arrays', () => {
    expect(intersectionWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x)).toEqual({ nested: { prop: [{ x: 2 }] } })
  })
})
