/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { shuffle } from './shuffle'

describe('Shuffle', () => {
  it('should shuffle an array', () => {
    immutaTest((input, path) => {
      const output = shuffle(input, path)
      expect(output.nested.prop).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9]))
      expect(output.nested.prop).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
      return output
    }, {
      nested: { prop: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      other: {},
    }, 'nested.prop')
  })
})
