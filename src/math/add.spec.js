/* eslint-env node, mocha */
import add from './add'
import { expect } from 'chai'

describe('Add', () => {

  it('should add two numbers', () => {
    expect(add({ nested: { prop: 2 } }, 'nested.prop', 4)).to.be.deep.equal({ nested: { prop: 6 } })
  })
})
