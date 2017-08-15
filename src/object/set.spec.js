/* eslint-env jest */
import { set } from './set'

describe('Set', () => {

  it('should set a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = set(input, 'nested.prop', 'final')

    expect(input).toEqual({ nested: { prop: 'initial' } })
    expect(input.nested).toBe(nested)
    expect(output).toEqual({ nested: { prop: 'final' } })
  })

  it('should set a deep undefined prop', () => {
    expect(set(undefined, 'nested.prop', 'final')).toEqual({ nested: { prop: 'final' } })
  })
})
