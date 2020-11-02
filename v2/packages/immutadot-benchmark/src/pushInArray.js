/* eslint-env jest */
import * as qim from 'qim'
import immer, { setAutoFreeze } from 'immer'
import Immutable from 'immutable'
import Seamless from 'seamless-immutable/seamless-immutable.production.min'
import { push } from 'immutadot/array'

export function pushInArray(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: [1, 2, 3],
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
    'Push values in array',
    (key, result) => {
      if (key === 'immutable') return
      expect(result).toEqual({
        nested: {
          prop: [1, 2, 3, 4, 5, 6],
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
          prop: [...baseState.nested.prop, 4, 5, 6],
        },
      }
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.updateIn(['nested', 'prop'], prop => [...prop, 4, 5, 6])
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.updateIn(seamlessState, ['nested', 'prop'], prop => [...prop, 4, 5, 6])
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested.prop.push(4, 5, 6)
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested', 'prop', qim.$end], [4, 5, 6], baseState)
    })
  })

  it('immutad●t', () => {
    benchmark('immutadot', () => {
      return push(baseState, 'nested.prop', 4, 5, 6)
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested', 'prop', qim.$end])([4, 5, 6])(baseState)
    })
  })

  it('immutad●t curried', () => {
    benchmark('immutadot-curried', () => {
      return push('nested.prop')(4, 5, 6)(baseState)
    })
  })
}
