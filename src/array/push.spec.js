/* eslint-env node, mocha */
import { expect } from 'chai'

import push from './push'

describe('Push', () => {

  it('should add one element', () => {
    const original = { nested: { prop: [1, 2] } }

    const final = push(original, 'nested.prop', 3)

    expect(final).to.be.deep.equal({ nested: { prop: [1, 2, 3] } })
    expect(original).to.be.deep.equal({ nested: { prop: [1, 2] } })
  })

  it('should add several elements', () => {
    expect(push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4)).to.be.deep.equal({ nested: { prop: [1, 2, 3, 4] } })
  })

  it('should replace deep undefined with array', () => {
    expect(push(undefined, 'nested.prop', 1)).to.be.deep.equal({ nested: { prop: [1] } })
  })
})
