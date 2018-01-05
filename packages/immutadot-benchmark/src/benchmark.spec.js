/* eslint-env jest */

import { List, Record } from 'immutable'

import immer, { setAutoFreeze } from 'immer'
import immerES5, { setAutoFreeze as setAutoFreezeES5 } from 'immer/es5'

import cloneDeep from 'lodash/cloneDeep'

import { set } from 'immutadot/core'

function benchmark(title, operation, maxTime = 30, maxOperations = 1000) {
  const startTime = Date.now()
  const maxTimeMs = maxTime * 1000
  const maxRunTime = maxTimeMs / 10 // Max run time is a tenth of max time
  const limitEndTime = startTime + maxTimeMs

  let iterations = Math.min(10, maxOperations) // Start 10 iterations
  let nbOperations = 0
  let totalTime = 0

  while (iterations > 0) {
    nbOperations += iterations

    const runStartTime = Date.now()
    while (iterations--) operation()
    totalTime += Date.now() - runStartTime

    const tempMeanTime = totalTime / nbOperations

    iterations = Math.min(
      // Either enough operations to consume max run time or remaining time
      Math.ceil(Math.min(maxRunTime, Math.max(limitEndTime - Date.now(), 0)) / tempMeanTime),
      // Or enough operations to reach max operations
      maxOperations - nbOperations,
    )
  }

  return {
    title,
    totalTime,
    nbOperations,
  }
}

describe('Benchmarks', () => {

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

    const results = []

    // FIXME add lodash to dependencies
    it('deep cloning', () => {
      results.push(benchmark('lodash deep cloning, then mutation', () => {
        const newState = cloneDeep(baseState)
        for (let i = 0; i < modifySize; i++)
          newState[i].done = true
        expect(newState).not.toBeUndefined()
      }))
    })

    it('ES2015', () => {
      results.push(benchmark('ES2015 destructuring', () => {
        const newState = baseState
          .slice(0, modifySize)
          .map(todo => ({
            ...todo,
            done: true,
          }))
          .concat(baseState.slice(modifySize))
        expect(newState).not.toBeUndefined()
      }))
    })

    it('immutable w/o conversion', () => {
      results.push(benchmark('immutable (w/o conversion to plain JS objects)', () => {
        const newState = immutableState.withMutations(state => {
          for (let i = 0; i < modifySize; i++)
            state.setIn([i, 'done'], true)
        })
        expect(newState).not.toBeUndefined()
      }))
    })

    it('immutable w/ conversion', () => {
      results.push(benchmark('immutable (w/ conversion to plain JS objects)', () => {
        const newState = immutableState.withMutations(state => {
          for (let i = 0; i < modifySize; i++)
            state.setIn([i, 'done'], true)
        }).toJS()
        expect(newState).not.toBeUndefined()
      }))
    })

    it('immer proxy', () => {
      results.push(benchmark('immer (proxy implementation w/o autofreeze)', () => {
        const newState = immer(baseState, draft => {
          for (let i = 0; i < modifySize; i++)
            draft[i].done = true
        })
        expect(newState).not.toBeUndefined()
      }))
    })

    it('immer ES5', () => {
      results.push(benchmark('immer (ES5 implementation w/o autofreeze)', () => {
        const newState = immerES5(baseState, draft => {
          for (let i = 0; i < modifySize; i++)
            draft[i].done = true
        })
        expect(newState).not.toBeUndefined()
      }))
    })

    it('immutad●t', () => {
      results.push(benchmark('immutad●t', () => {
        const newState = set(baseState, `[:${modifySize}].done`, true)
        expect(newState).not.toBeUndefined()
      }))
    })

    afterAll(() => {
      console.log( // eslint-disable-line no-console
        results
          .map(({ title, totalTime, nbOperations }) => `${title}: ~${(totalTime / nbOperations).toFixed(2)}ms/op on ${nbOperations}ops`)
          .join('\n'),
      )
    })
  })
})
