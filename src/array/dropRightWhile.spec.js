/* eslint-env jest */
import { dropRightWhile } from './dropRightWhile'
import { immutaTest } from 'test.utils'

describe('DropRightWhile', () => {

  it('should drop elements > 2 at the end of the array', () => {
    immutaTest((input, path) => {
      const output = dropRightWhile(input, path, v => v > 2)
      expect(output).toEqual({ nested: { prop: [1, 2] } })
      return output
    }, { nested: { prop: [1, 2, 3, 4] } }, 'nested.prop')
  })
})
