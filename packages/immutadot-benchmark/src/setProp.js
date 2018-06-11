/* eslint-env jest */
import immer, { setAutoFreeze } from 'immer'

import { set as qimSet } from 'qim'

import { set } from 'immutadot/core'

import Seamless from 'seamless-immutable/seamless-immutable.production.min'

export function setProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: 'foo',
      otherProp: 'aze',
    },
    other: { prop: 'baz' },
  }

  const seamlessBaseState = Seamless.from(baseState)

  // Disable immer auto freeze
  setAutoFreeze(false)

  const benchmark = benchmarkSuite.createBenchmark(
    'Set a property',
    (key, result) => {
      expect(result).toEqual({
        nested: {
          prop: 'bar',
          otherProp: 'aze',
        },
        other: { prop: 'baz' },
      })
    },
    10,
    5000000,
  )

  it('es2015', () => {
    benchmark('es2015', () => {
      return {
        ...baseState,
        nested: {
          ...baseState.nested,
          prop: 'bar',
        },
      }
    })
  })

  // FIXME immutable

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.setIn(seamlessBaseState, ['nested', 'prop'], 'bar')
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested.prop = 'bar'
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qimSet(['nested', 'prop'], 'bar', baseState)
    })
  })

  it('immutad●t', () => {
    benchmark('immutadot', () => {
      return set(baseState, 'nested.prop', 'bar')
    })
  })
}
