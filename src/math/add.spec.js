/* eslint-env node, mocha */
import { expect } from 'chai'

import add from './add'

describe('Add', () => {

  it('should add two numbers', () => {
    expect(add({ nested: { prop: 2 } }, 'nested.prop', 4)).to.be.deep.equal({ nested: { prop: 6 } })
  })
})
