/* eslint-env jest */
import { fill } from './fill'
import { immutaTest } from 'test.utils'

describe('Fill', () => {

  it('should fill array with 6 from 1 to 3 excluded', () => {
    immutaTest((input, path) => {
      const output = fill(input, path, 6, 1, 3)
      expect(output).toEqual({
        nested: { prop: [1, 6, 6, 4] }, // 🍺
        other: {},
      })
      return output
    }, {
      nested: { prop: [1, 2, 3, 4] },
      other: {},
    }, 'nested.prop')
  })
})
