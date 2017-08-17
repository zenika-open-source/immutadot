/* eslint-env jest */
import { reverse } from './reverse'

describe('Reverse', () => {

  it('should reverse the elements', () => {
    expect(reverse({ nested: { prop: [1, 2, 3] } }, 'nested.prop')).toEqual({ nested: { prop: [3, 2, 1] } })
  })
})
