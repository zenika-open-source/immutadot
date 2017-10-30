/* eslint-env jest */
import { formerUpdate } from './update'
import { immutaTest } from 'test.utils'

describe('Former Update', () => {

  const inc = (v, i = 1) => v + i

  it('should update a prop', () => {
    immutaTest((input, path) => {
      const output = formerUpdate(input, path, inc)
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
      const output = formerUpdate(input, path, inc, 2)
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
})
