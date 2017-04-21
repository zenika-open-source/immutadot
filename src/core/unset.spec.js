/* eslint-env node, mocha */
import { expect } from 'chai'

import unset from './unset'

describe('Unset', () => {

  it('should unset a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = unset(input, 'nested.prop')

    expect(input).to.be.deep.equal({ nested: { prop: 'initial' } })
    expect(input.nested).to.be.equal(nested)
    expect(output).to.be.deep.equal({ nested: {} })
  })
})
