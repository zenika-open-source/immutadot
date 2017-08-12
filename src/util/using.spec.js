/* eslint-env jest */
import using from './using'

describe('Using', () => {

  it('should set a prop with another prop', () => {
    const input = { nested: { a: 2 } }
    const output = using('nested.a').set(input, 'nested.b')
    expect(output).toEqual({
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
    expect(output).toEqual({
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
    const output = using('nested.a', 'nested.b').push(input, 'nested.c', 4)
    expect(output).toEqual({
      nested: {
        a: 2,
        b: 3,
        c: [1, 2, 3, 4],
      },
    })
  })

  it('should update a prop with another prop and a custom updater', () => {
    const input = {
      pages: [1, 2, 3],
      selectedPages: [4, 5, 6],
    }
    const output = using('pages').update(input, 'selectedPages', (_, pages, start, end) => pages.slice(start, start + end), 1, 2)
    expect(output).toEqual({
      pages: [1, 2, 3],
      selectedPages: [2, 3],
    })
  })
})
