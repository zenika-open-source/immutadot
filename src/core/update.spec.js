/* eslint-env node, mocha */
import update from './update'

describe('Update', () => {

  const inc = (v, i = 1) => v + i

  it('should update a prop', () => {
    const nested = { prop: 5 }
    const input = { nested }

    const output = update(input, 'nested.prop', inc)

    input.should.deep.equal({ nested: { prop: 5 } })
    input.nested.should.equal(nested)
    output.should.deep.equal({ nested: { prop: 6 } })
  })

  it('should update a prop with a param', () => {
    update({ nested: { prop: 5 } }, 'nested.prop', inc, 2).should.deep.equal({ nested: { prop: 7 } })
  })

  it('should wrap a function', () => {
    const immutableInc = update(inc)

    immutableInc({ nested: { prop: 5 } }, 'nested.prop').should.deep.equal({ nested: { prop: 6 } })
    immutableInc({ nested: { prop: 5 } }, 'nested.prop', 2).should.deep.equal({ nested: { prop: 7 } })
  })
})
