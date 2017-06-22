/* eslint-env node, mocha */
import unset from './unset'

describe('Unset', () => {

  it('should unset a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = unset(input, 'nested.prop')

    input.should.deep.equal({ nested: { prop: 'initial' } })
    input.nested.should.equal(nested)
    output.should.deep.equal({ nested: {} })
  })
})
