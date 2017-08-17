/* eslint-env jest */
import { union } from './union'

describe('Union', () => {

  it('should create a set of unique values', () => {
    expect(union({ nested: { prop: [1, 2] } }, 'nested.prop', [2, 3])).toEqual({ nested: { prop: [1, 2, 3] } })
  })
})
