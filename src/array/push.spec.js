/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { push } from './push'

describe('Push', () => {

  it('should add one element', () => {
    immutaTest((input, path) => {
      const output = push(input, path, 3)
      expect(output).toEqual({ nested: { prop: [1, 2, 3] } })
      return output
    }, { nested: { prop: [1, 2] } }, 'nested.prop')
  })

  it('should add several elements', () => {
    immutaTest((input, path) => {
      const output = push(input, path, 3, 4)
      expect(output).toEqual({ nested: { prop: [1, 2, 3, 4] } })
      return output
    }, { nested: { prop: [1, 2] } }, 'nested.prop')
  })

  it('should replace deep undefined with array', () => {
    immutaTest((input, path) => {
      const output = push(input, path, 1)
      expect(output).toEqual({ nested: { prop: [1] } })
      return output
    }, undefined, 'nested.prop')
  })
})
