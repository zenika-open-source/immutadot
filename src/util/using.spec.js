/* eslint-env jest */
import { immutaTest } from 'test.utils'
import { using } from './using'

describe('Using', () => {

  it('should set a prop with another prop', () => {
    immutaTest((input, path) => {
      const output = using('nested.a').set(input, path)
      expect(output).toEqual({
        nested: {
          a: 2,
          b: 2,
        },
        other: {},
      })
      return output
    }, {
      nested: { a: 2 },
      other: {},
    }, 'nested.b')
  })

  it('should update a prop with another prop', () => {
    immutaTest((input, path) => {
      const output = using('nested.a').add(input, path)
      expect(output).toEqual({
        nested: {
          a: 2,
          b: 5,
        },
        other: {},
      })
      return output
    }, {
      nested: {
        a: 2,
        b: 3,
      },
      other: {},
    }, 'nested.b')
  })

  it('should update a prop with several other props', () => {
    immutaTest((input, path) => {
      const output = using('nested.a', 'nested.b').push(input, path, 4)
      expect(output).toEqual({
        nested: {
          a: 2,
          b: 3,
          c: [1, 2, 3, 4],
        },
        other: {},
      })
      return output
    }, {
      nested: {
        a: 2,
        b: 3,
        c: [1],
      },
      other: {},
    }, 'nested.c')
  })

  it('should update a prop with another prop and a custom updater', () => {
    immutaTest((input, path) => {
      const output = using(using._, 'nested.b').update(
        input,
        path,
        (a, b, c) => a * b + c,
        4,
      )
      expect(output).toEqual({
        nested: {
          a: 10,
          b: 3,
        },
        other: {},
      })
      return output
    }, {
      nested: {
        a: 2,
        b: 3,
      },
      other: {},
    }, 'nested.a')
  })
})
