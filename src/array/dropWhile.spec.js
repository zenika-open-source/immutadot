/* eslint-env jest */
import { dropWhile } from './dropWhile'
import { immutaTest } from 'test.utils'

describe('DropWhile', () => {

  it('should drop elements < 3 at the beginning of the array', () => {
    immutaTest((input, path) => {
      const output = dropWhile(input, path, v => v < 3)
      expect(output).toEqual({
        nested: { prop: [3, 4] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })
})
