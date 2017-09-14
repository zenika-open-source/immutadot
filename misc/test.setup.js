/* eslint-env jest */
import groupBy from 'lodash/groupBy'
import intersectionWith from 'lodash/intersectionWith'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import map from 'lodash/map'
import { toRefs } from 'test.utils'
import xorWith from 'lodash/xorWith'

const toFilter = filter => {
  if (isArray(filter)) return filter
  if (isString(filter)) return [filter]
  return []
}

const toFilterFn = (pFilter, exclude) => {
  const filter = toFilter(pFilter)
  if (!filter.length) return undefined
  if (exclude)
    return ([path]) => filter.every(filterPath => !filterPath.startsWith(path) && !path.startsWith(filterPath))
  return ([path]) => filter.some(filterPath => filterPath.startsWith(path))
}

expect.extend({
  toBeDeep(received, pRefs, { include, exclude } = {}) {
    let refs = pRefs
    let receivedRefs = toRefs(received)

    const includeFilter = toFilterFn(include, false)
    if (includeFilter) {
      refs = refs.filter(includeFilter)
      receivedRefs = receivedRefs.filter(includeFilter)
    }

    const excludeFilter = toFilterFn(exclude, true)
    if (excludeFilter) {
      refs = refs.filter(excludeFilter)
      receivedRefs = receivedRefs.filter(excludeFilter)
    }

    const diff = (this.isNot ? intersectionWith : xorWith)(refs, receivedRefs, (ref, receivedRef) => ref[0] === receivedRef[0] && ref[1] === receivedRef[1])
    const pass = Boolean(this.isNot ^ !diff.length)
    let message
    if (pass) {
      message = () => {
        const formattedDiff = map(diff, ([path, ref]) => `  "${path}": ${this.utils.printReceived(ref)}`).join('\n')
        return `${this.utils.matcherHint('.not.toBeDeep')} expected values not to have the same deep references, same references at paths :\n${formattedDiff}`
      }
    } else {
      message = () => {
        const formattedDiff = map(
          groupBy(diff, ref => ref[0]),
          ([[, ref], [, receivedRef] = []], path) => `  "${path}": ${this.utils.printExpected(ref)} !== ${this.utils.printReceived(receivedRef)}`,
        ).join('\n')
        return `${this.utils.matcherHint('.toBeDeep')} expected values to have the same deep references, different references at paths :\n${formattedDiff}`
      }
    }

    return {
      message,
      pass,
    }
  },
})
