/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { update } from 'core'

describe('Update', () => {

  const inc = (v, i = 1) => v + i

  const add = (v, ...addends) => addends.reduce((prev, next) => prev + next, v)

  it('should update a prop', () => {
    immutaTest((input, path) => {
      const output = update(input, path, inc)
      expect(output).toEqual({
        nested: { prop: 6 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 5 },
      other: {},
    }, 'nested.prop')
  })

  it('should update a prop with a param', () => {
    immutaTest((input, path) => {
      const output = update(input, path, inc, 2)
      expect(output).toEqual({
        nested: { prop: 7 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 5 },
      other: {},
    }, 'nested.prop')
  })

  it('should update a prop with multiple params', () => {
    immutaTest((input, path) => {
      const output = update(input, path, add, 2, 4)
      expect(output).toEqual({
        nested: { prop: 11 },
        other: {},
      })
      return output
    }, {
      nested: { prop: 5 },
      other: {},
    }, 'nested.prop')
  })
})
