/* eslint-env jest */
import { xorBy } from './xorBy'

describe('XorBy', () => {

  it('should xor arrays', () => {
    expect(xorBy({ nested: { prop: [{ x: 1 }, { x: 2 }] } }, 'nested.prop', [{ x: 2 }, { x: 3 }], 'x')).toEqual({ nested: { prop: [{ x: 1 }, { x: 3 }] } })
  })
})
