/* eslint-env jest */
import { flatten } from './array'

describe('Array utils', () => {
  describe('util.flatten', () => {
    it('should flatten array', () => {
      expect(flatten([['a', 'b'], 'c', ['d', 'e']])).toEqual(['a', 'b', 'c', 'd', 'e'])
    })
  })
})
