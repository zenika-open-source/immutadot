/* eslint-env jest */
import { unionBy } from './unionBy'

describe('UnionBy', () => {

  it('should create a set of unique values', () => {
    expect(unionBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x')).toEqual({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } })
  })
})
