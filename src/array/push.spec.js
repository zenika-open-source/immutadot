/* eslint-env node, mocha */
import push from './push'

describe('Push', () => {

  it('should add one element', () => {
    const original = { nested: { prop: [1, 2] } }

    const final = push(original, 'nested.prop', 3)

    final.should.deep.equal({ nested: { prop: [1, 2, 3] } })
    original.should.deep.equal({ nested: { prop: [1, 2] } })
  })

  it('should add several elements', () => {
    push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4).should.deep.equal({ nested: { prop: [1, 2, 3, 4] } })
  })

  it('should replace deep undefined with array', () => {
    push(undefined, 'nested.prop', 1).should.deep.equal({ nested: { prop: [1] } })
  })
})
