/* eslint-env jest */
import * as qim from 'qim'
// import immer, { setAutoFreeze } from 'immer'
// import Immutable from 'immutable'
// import Seamless from 'seamless-immutable/seamless-immutable.production.min'

import { isString } from 'immutadot/util/lang'
import { nav } from 'immutadot/nav/nav'
import { set } from 'immutadot/core'
import { toPath } from '@immutadot/parser'

export function setProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested: {
      prop: 'foo',
      otherProp: 'aze',
    },
    other: { prop: 'baz' },
  }

  // // Prepare immutable state
  // const immutableState = Immutable.fromJS(baseState)

  // // Prepare seamless state
  // const seamlessState = Seamless.from(baseState)

  // // Disable immer auto freeze
  // setAutoFreeze(false)

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

  // it('immutable', () => {
  //   benchmark('immutable', () => {
  //     immutableState.setIn(['nested', 'prop'], 'bar')
  //   })
  // })

  // it('seamless', () => {
  //   benchmark('seamless', () => {
  //     return Seamless.setIn(seamlessState, ['nested', 'prop'], 'bar')
  //   })
  // })

  // it('immer', () => {
  //   benchmark('immer', () => {
  //     return immer(baseState, draft => {
  //       draft.nested.prop = 'bar'
  //     })
  //   })
  // })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested', 'prop'], 'bar', baseState)
    })
  })

  it('immutad●t', () => {
    benchmark('immutadot', () => {
      return set(baseState, 'nested.prop', 'bar')
    })
  })

  it('immutad●t 310', () => {
    function set(obj, path, value) {
      return nav(toPath(path))(obj).update(() => value)
    }
    const curried = (path, value) => obj => set(obj, path, value)
    function optionallyCurried(...args) {
      return isString(args[0]) ? curried(...args) : set(...args)
    }

    benchmark('immutadot310', () => {
      return optionallyCurried(baseState, 'nested.prop', 'bar')
    })
  })

}
