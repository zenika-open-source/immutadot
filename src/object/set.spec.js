/* eslint-env node, mocha */
import set from './set'

describe('Set', () => {

  it('should set a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = set(input, 'nested.prop', 'final')

    input.should.deep.equal({ nested: { prop: 'initial' } })
    input.nested.should.equal(nested)
    output.should.deep.equal({ nested: { prop: 'final' } })
  })

  it('should set a deep undefined prop', () => {
    set(undefined, 'nested.prop', 'final').should.deep.equal({ nested: { prop: 'final' } })
  })
})
