/* eslint-env node, mocha */
import add from './add'

describe('Add', () => {

  it('should add two numbers', () => {
    add({ nested: { prop: 2 } }, 'nested.prop', 4).should.deep.equal({ nested: { prop: 6 } })
  })
})
