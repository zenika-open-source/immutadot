/* eslint-env jest */
import { intersectionBy } from './intersectionBy'

describe('IntersectionBy', () => {

  it('should replace by intersection of arrays', () => {
    expect(intersectionBy({ nested: { prop: [1.2, 2.1] } }, 'nested.prop', [2.3, 3.2], Math.floor)).toEqual({ nested: { prop: [2.1] } })
  })
})
