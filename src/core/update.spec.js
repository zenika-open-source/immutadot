/* eslint-env node, mocha */
import { expect } from 'chai'
import update from './update'

describe('Update', () => {

  const inc = (v, i = 1) => v + i

  it('should update a prop', () => {
    const nested = { prop: 5 }
    const input = { nested }

    const output = update(input, 'nested.prop', inc)

    expect(input).to.be.deep.equal({ nested: { prop: 5 } })
    expect(input.nested).to.be.equal(nested)
    expect(output).to.be.deep.equal({ nested: { prop: 6 } })
  })

  it('should update a prop with a param', () => {
    expect(update({ nested: { prop: 5 } }, 'nested.prop', inc, 2)).to.be.deep.equal({ nested: { prop: 7 } })
  })

  it('should wrap a function', () => {
    const immutableInc = update(inc)

    expect(immutableInc({ nested: { prop: 5 } }, 'nested.prop')).to.be.deep.equal({ nested: { prop: 6 } })
    expect(immutableInc({ nested: { prop: 5 } }, 'nested.prop', 2)).to.be.deep.equal({ nested: { prop: 7 } })
  })
})
