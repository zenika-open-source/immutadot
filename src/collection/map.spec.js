/* eslint-env node, mocha */
import map from './map'

describe('Map', () => {

  it('should map an array', () => {
    map({ nested: { prop: [1, 2] } }, 'nested.prop', v => v * 2).should.deep.equal({ nested: { prop: [2, 4] } })
  })

  it('should replace deep undefined with empty array', () => {
    map(undefined, 'nested.prop').should.deep.equal({ nested: { prop: [] } })
  })
})
