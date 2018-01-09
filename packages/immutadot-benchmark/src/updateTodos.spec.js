/* eslint-env jest */

import { List, Record } from 'immutable'

import immer, { setAutoFreeze } from 'immer'
import immerES5, { setAutoFreeze as setAutoFreezeES5 } from 'immer/es5'

import cloneDeep from 'lodash/cloneDeep'

import { createBenchmark } from './benchmark'

import { set } from 'immutadot/core'

describe('Update todos list', () => {
  const listSize = 100000
  const modifySize = 10000

  // Prepare base state
  const baseState = []
  for (let i = 0; i < listSize; i++) {
    baseState.push({
      todo: `todo_${i}`,
      done: false,
      someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    })
  }

  // Prepare immutalbe state
  const todoRecord = Record({
    todo: '',
    done: false,
    someThingCompletelyIrrelevant: [],
  })
  const immutableState = List(baseState.map(todo => todoRecord(todo)))

  // Disable immer auto freeze
  setAutoFreeze(false)
  setAutoFreezeES5(false)

  const benchmark = createBenchmark('Update todos list')

  it('deep cloning', () => {
    benchmark('lodash 4.17.4 deep cloning, then mutation', () => {
      const newState = cloneDeep(baseState)
      for (let i = 0; i < modifySize; i++)
        newState[i].done = true
      expect(newState).not.toBeUndefined()
    })
  })

  it('ES2015', () => {
    benchmark('ES2015 destructuring', () => {
      const newState = baseState
        .slice(0, modifySize)
        .map(todo => ({
          ...todo,
          done: true,
        }))
        .concat(baseState.slice(modifySize))
      expect(newState).not.toBeUndefined()
    })
  })

  it('immutable w/o conversion', () => {
    benchmark('immutable 3.8.2 (w/o conversion to plain JS objects)', () => {
      const newState = immutableState.withMutations(state => {
        for (let i = 0; i < modifySize; i++)
          state.setIn([i, 'done'], true)
      })
      expect(newState).not.toBeUndefined()
    })
  })

  it('immutable w/ conversion', () => {
    benchmark('immutable 3.8.2 (w/ conversion to plain JS objects)', () => {
      const newState = immutableState.withMutations(state => {
        for (let i = 0; i < modifySize; i++)
          state.setIn([i, 'done'], true)
      }).toJS()
      expect(newState).not.toBeUndefined()
    })
  })

  it('immer proxy', () => {
    benchmark('immer 0.3.0 (proxy implementation w/o autofreeze)', () => {
      const newState = immer(baseState, draft => {
        for (let i = 0; i < modifySize; i++)
          draft[i].done = true
      })
      expect(newState).not.toBeUndefined()
    })
  })

  it('immer ES5', () => {
    benchmark('immer 0.3.0 (ES5 implementation w/o autofreeze)', () => {
      const newState = immerES5(baseState, draft => {
        for (let i = 0; i < modifySize; i++)
          draft[i].done = true
      })
      expect(newState).not.toBeUndefined()
    })
  })

  it('immutad●t', () => {
    benchmark('immutad●t 1.0.0-rc.6', () => {
      const newState = set(baseState, `[:${modifySize}].done`, true)
      expect(newState).not.toBeUndefined()
    })
  })

  afterAll(benchmark.log)
})
