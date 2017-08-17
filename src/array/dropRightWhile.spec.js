/* eslint-env jest */
import { dropRightWhile } from './dropRightWhile'

describe('DropRightWhile', () => {

  it('should drop elements > 2 at the end of the array', () => {
    expect(dropRightWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v > 2)).toEqual({ nested: { prop: [1, 2] } })
  })
})
