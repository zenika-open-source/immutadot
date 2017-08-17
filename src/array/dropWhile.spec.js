/* eslint-env jest */
import dropWhile from './dropWhile'

describe('DropWhile', () => {

  it('should drop elements < 3 at the beginning of the array', () => {
    expect(dropWhile({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v < 3)).toEqual({ nested: { prop: [3, 4] } })
  })
})
