/* eslint-env node, mocha */
import using from './using'

describe('Using', () => {

  it('should set a prop with another prop', () => {
    const input = { nested: { a: 2 } }
    const output = using('nested.a').set(input, 'nested.b')
    output.should.deep.equal({
      nested: {
        a: 2,
        b: 2,
      },
    })
  })

  it('should update a prop with another prop', () => {
    const input = {
      nested: {
        a: 2,
        b: 3,
      },
    }
    const output = using('nested.a').add(input, 'nested.b')
    output.should.deep.equal({
      nested: {
        a: 2,
        b: 5,
      },
    })
  })

  it('should update a prop with several other props', () => {
    const input = {
      nested: {
        a: 2,
        b: 3,
        c: [1],
      },
    }
    const output = using('nested.a', 'nested.b').push(input, 'nested.c')
    output.should.deep.equal({
      nested: {
        a: 2,
        b: 3,
        c: [1, 2, 3],
      },
    })
  })
})
