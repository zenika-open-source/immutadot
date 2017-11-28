/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { remove } from 'array'

describe('Remove', () => {

  it('should remove an element', () => {
    immutaTest((input, path) => {
      const output = remove(input, path, v => v === 2)
      expect(output).toEqual({
        nested: { prop: [1, 3] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3] },
      other: {},
    }, 'nested.prop')
  })
})
