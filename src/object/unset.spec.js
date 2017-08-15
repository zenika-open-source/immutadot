/* eslint-env jest */
import { unset } from './unset'

describe('Unset', () => {

  it('should unset a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = unset(input, 'nested.prop')

    expect(input).toEqual({ nested: { prop: 'initial' } })
    expect(input.nested).toBe(nested)
    expect(output).toEqual({ nested: {} })
  })
})
