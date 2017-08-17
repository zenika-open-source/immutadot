/* eslint-env jest */
import { unionWith } from './unionWith'

describe('UnionWith', () => {

  it('should create a set of unique values', () => {
    expect(unionWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x)).toEqual({ nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }] } })
  })
})
