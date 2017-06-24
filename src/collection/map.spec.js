/* eslint-env jest */
import map from './map'

describe('Map', () => {

  it('should map an array', () => {
    expect(map({ nested: { prop: [1, 2] } }, 'nested.prop', v => v * 2)).toEqual({ nested: { prop: [2, 4] } })
  })

  it('should replace deep undefined with empty array', () => {
    expect(map(undefined, 'nested.prop')).toEqual({ nested: { prop: [] } })
  })
})
