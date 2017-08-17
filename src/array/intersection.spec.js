/* eslint-env jest */
import { intersection } from './intersection'

describe('Intersection', () => {

  it('should replace by intersection of arrays', () => {
    expect(intersection({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3])).toEqual({ nested: { prop: [2] } })
  })
})
