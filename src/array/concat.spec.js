/* eslint-env jest */
import { concat } from './concat'
import { toRefs } from 'test.utils'

describe('Concat', () => {

  it('should concat an array', () => {
    const input = { nested: { prop: [1, 2] } }

    const inputRefs = toRefs(input)

    const output = concat(input, 'nested.prop', [3, 4])

    expect(output).toEqual({ nested: { prop: [1, 2, 3, 4] } })

    expect(input).toBeDeep(inputRefs)
    expect(output).toBeDeep(inputRefs, { exclude: 'nested.prop' })
    expect(output).not.toBeDeep(inputRefs, { include: 'nested.prop' })
  })

  it('should add several arrays', () => {
    expect(concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4], [5, 6])).toEqual({ nested: { prop: [1, 2, 3, 4, 5, 6] } })
  })

  it('should replace value with array', () => {
    expect(concat({ nested: { prop: 1 } }, 'nested.prop', [2, 3])).toEqual({ nested: { prop: [1, 2, 3] } })
  })
})
