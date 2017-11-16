/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pullAllBy } from 'array'

describe('PullAllBy', () => {

  it('should remove several matching elements', () => {
    immutaTest((input, path) => {
      const output = pullAllBy(input, path, [{ x: 1 }, { x: 3 }], 'x')
      expect(output).toEqual({
        nested: { prop: [{ x: 2 }, { x: 2 }] },
        other: {},
      })
      return output
    }, {
      nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] },
      other: {},
    }, 'nested.prop')
  })
})
