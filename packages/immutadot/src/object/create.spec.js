/* eslint-env jest */
import { create } from 'object'
import { immutaTest } from 'test.utils'
describe('object.create', () => {
  it('should createialize objects', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = create(path, 1)
      expect(output).toEqual({ nested: { prop: 1 } })
      return output
    })
  })
})
