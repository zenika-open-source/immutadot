/* eslint-env jest */
import { copyWithin } from 'array'
import { immutaTest } from 'test.utils'

describe('array.copyWithin', () => {
  it('should copy within an array', () => {
    immutaTest({
      nested: {
        prop: [1, 2, 3, 4, 5],
      },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = copyWithin(input, path, 0, 3, 4)
      expect(output).toEqual({
        nested: {
          prop: [4, 2, 3, 4, 5],
        },
        other: {},
      })
      return output
    })
  })
})
