/* eslint-env node, mocha */
import { expect } from 'chai'

import set from './set'

describe('Set', () => {

  it('should set a prop', () => {
    const nested = { prop: 'initial' }
    const input = { nested }

    const output = set(input, 'nested.prop', 'final')

    expect(input).to.be.deep.equal({ nested: { prop: 'initial' } })
    expect(input.nested).to.be.equal(nested)
    expect(output).to.be.deep.equal({ nested: { prop: 'final' } })
  })

  it('should set a deep undefined prop', () => {
    expect(set(undefined, 'nested.prop', 'final')).to.be.deep.equal({ nested: { prop: 'final' } })
  })
})
