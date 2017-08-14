/* eslint-env jest */
import { differenceWith } from './differenceWith'

describe('DifferenceWith', () => {

  it('should remove intersecting elements according to iteratee', () => {
    expect(differenceWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x)).toEqual({ nested: { prop: [{ x: 1 }] } })
  })
})
