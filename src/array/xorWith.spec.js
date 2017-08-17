/* eslint-env jest */
import { xorWith } from './xorWith'

describe('XorWith', () => {

  it('should xor arrays', () => {
    expect(xorWith({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], (a, b) => a.x === b.x)).toEqual({ nested: { prop: [{ x: 1 }, { x: 3 }] } })
  })
})
