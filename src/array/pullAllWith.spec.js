/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { pullAllWith } from './pullAllWith'

describe('PullAllWith', () => {

  it('should remove several matching elements', () => {
    immutaTest((input, path) => {
      const output = pullAllWith(input, path, [{ x: 1 }, { x: 3 }], (a, b) => a.x === b.x)
      expect(output).toEqual({ nested: { prop: [{ x: 2 }, { x: 2 }] } })
      return output
    }, { nested: { prop: [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }] } }, 'nested.prop')
  })
})
