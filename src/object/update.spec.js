/* eslint-env jest */
import { update } from './update'

describe('Update', () => {

  const inc = (v, i = 1) => v + i

  it('should update a prop', () => {
    const nested = { prop: 5 }
    const input = { nested }

    const output = update(input, 'nested.prop', inc)

    expect(input).toEqual({ nested: { prop: 5 } })
    expect(input.nested).toBe(nested)
    expect(output).toEqual({ nested: { prop: 6 } })
  })

  it('should update a prop with a param', () => {
    expect(update({ nested: { prop: 5 } }, 'nested.prop', inc, 2)).toEqual({ nested: { prop: 7 } })
  })
})
