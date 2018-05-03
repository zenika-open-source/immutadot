/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { set } from 'core'
describe('core.set', () => {
  it('should set a prop', () => {
    immutaTest({
      nested: { prop: 'initial' },
      other: {},
    }, ['nested.prop'], (input, path) => {
      const output = set(input, path, 'final')
      expect(output).toEqual({
        nested: { prop: 'final' },
        other: {},
      })
      return output
    })
  })
  it('should set a value in an array', () => {
    immutaTest({
      nested: {
        prop: [
          'initial',
          'other',
        ],
      },
      other: {},
    }, ['nested.prop.0'], input => {
      const output = set(input, 'nested.prop[0]', 'final')
      expect(output).toEqual({
        nested: {
          prop: [
            'final',
            'other',
          ],
        },
        other: {},
      })
      return output
    })
  })
  it('should set a deep undefined prop', () => {
    immutaTest(undefined, ['nested.prop'], (input, path) => {
      const output = set(input, path, 'final')
      expect(output).toEqual({ nested: { prop: 'final' } })
      return output
    })
  })
  it('should set a deep undefined prop within an array', () => {
    immutaTest({ other: {} }, ['nested.prop.0'], input => {
      const output = set(input, 'nested.prop[0]', 'final')
      expect(output).toEqual({
        nested: { prop: ['final'] },
        other: {},
      })
      return output
    })
  })
})
