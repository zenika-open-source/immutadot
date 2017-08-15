/* eslint-env jest */
import { unshift } from './unshift'

describe('Unshift', () => {

  it('should add one element', () => {
    const original = { nested: { prop: [1, 2] } }

    const final = unshift(original, 'nested.prop', 3)

    expect(final).toEqual({ nested: { prop: [3, 1, 2] } })
    expect(original).toEqual({ nested: { prop: [1, 2] } })
  })

  it('should add several elements', () => {
    expect(unshift({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)).toEqual({ nested: { prop: [3, 4, 1, 2] } })
  })

  it('should replace deep undefined with array', () => {
    expect(unshift(undefined, 'nested.prop', 1)).toEqual({ nested: { prop: [1] } })
  })
})
