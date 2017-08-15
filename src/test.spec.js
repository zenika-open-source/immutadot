/* eslint-env jest */
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import xorWith from 'lodash/xorWith'

const toRefs = object => {
  const stack = [[[], object]]
  const refs = []

  while (stack.length) {
    const ref = stack.shift()
    refs.push(ref)
    forEach(ref[1], (value, prop) => {
      stack.push([[...ref[0], prop], value])
    })
  }

  return refs
}

expect.extend({
  toBeDeep(received, refs) {
    const receivedRefs = toRefs(received)
    const diff = xorWith(refs, receivedRefs, (ref, receivedRef) => isEqual(ref[0], receivedRef[0]) && ref[1] === receivedRef[1])
    const pass = !diff.length
    let message
    if (pass)
      message = () => `${this.utils.matcherHint('.not.toBeDeep')} expected value not to be the same deep references`
    else
      message = () => {
        const formattedDiff = map(
          groupBy(diff, ref => ref[0].join('.')),
          ([[, ref], [, receivedRef] = []], path) => `  "${path}": ${this.utils.printExpected(ref)} !== ${this.utils.printReceived(receivedRef)}`,
        ).join('\n')
        return `${this.utils.matcherHint('.toBeDeep')} expected value to be the same deep references, differences at paths :\n${formattedDiff}`
      }

    return {
      message,
      pass,
    }
  },
})

describe('test', () => {
  it('should', () => {
    const input = {
      nested: { prop: [1, 2] },
      other: { prop: [3, 4] },
    }
    const refs = toRefs(input)

    input.other.a = 3
    input.other = { ...input.other }

    expect(input).not.toBeDeep(refs)
  })
})
