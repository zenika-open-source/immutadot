/* eslint-env jest */
import { differenceBy } from './differenceBy'

describe('DifferenceBy', () => {

  it('should remove intersecting elements according to iteratee', () => {
    expect(differenceBy({ nested: { prop: [1.2, 3.4, 5.6] } }, 'nested.prop', [5.4, 2.1], Math.floor)).toEqual({ nested: { prop: [1.2, 3.4] } })
  })
})
