/* eslint-env jest */
import * as qim from 'qim'
import immer, { setAutoFreeze } from 'immer'
import Immutable from 'immutable'
import Seamless from 'seamless-immutable/seamless-immutable.production.min'
import { set } from 'immutadot/core'

export function setProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: 'foo',
      otherProp: 'aze',
    },
    other: { prop: 'baz' },
  }

  // Prepare immutable state
  const immutableState = Immutable.fromJS(baseState)

  // Prepare seamless state
  const seamlessState = Seamless.from(baseState)

  // Disable immer auto freeze
  setAutoFreeze(false)

  const benchmark = benchmarkSuite.createBenchmark(
    'Set a property',
    (key, result) => {
      if (key === 'immutable') return
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

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.setIn(['nested', 'prop'], 'bar')
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.setIn(seamlessState, ['nested', 'prop'], 'bar')
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
      return qim.set(['nested', 'prop'], 'bar', baseState)
    })
  })

  it('immutadot', () => {
    benchmark('immutadot', () => {
      return set(baseState, 'nested.prop', 'bar')
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested', 'prop'])('bar')(baseState)
    })
  })

  it('immutadot curried', () => {
    benchmark('immutadot-curried', () => {
      return set('nested.prop')('bar')(baseState)
    })
  })
}
