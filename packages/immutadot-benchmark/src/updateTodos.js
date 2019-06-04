/* eslint-env jest */
import * as qim from 'qim'
import immer, { setAutoFreeze } from 'immer'
import Immutable from 'immutable'
import Seamless from 'seamless-immutable/seamless-immutable.production.min'
import { set } from 'immutadot/core'

export function updateTodos(benchmarkSuite, title, listSize, modifySize, maxTime, maxOperations) {
  // Prepare base state
  const baseState = []
  for (let i = 0; i < listSize; i++) {
    baseState.push({
      todo: `todo_${i}`,
      done: false,
      someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    })
  }

  // Prepare immutable state
  const todoRecord = Immutable.Record({
    todo: '',
    done: false,
    someThingCompletelyIrrelevant: [],
  })
  const immutableState = Immutable.List(baseState.map(todo => todoRecord(todo)))

  // Prepare seamless state
  const seamlessState = Seamless.from(baseState)

  // Disable immer auto freeze
  setAutoFreeze(false)

  const unmodifiedSize = listSize - modifySize
  const randomBounds = () => {
    const start = Math.floor(Math.random() * unmodifiedSize)
    return [start, start + modifySize]
  }

  const benchmark = benchmarkSuite.createBenchmark(
    title,
    (key, result) => {
      if (key === 'immutable') return
      let trues = 0, falses = 0
      result.forEach(todo => todo.done ? trues++ : falses++)
      expect(trues).toBe(modifySize)
      expect(falses).toBe(unmodifiedSize)
      trues = falses = 0
      baseState.forEach(todo => todo.done ? trues++ : falses++)
      expect(trues).toBe(0)
      expect(falses).toBe(listSize)
    },
    maxTime,
    maxOperations,
  )

  it('es2015', () => {
    benchmark('es2015', () => {
      const [start, end] = randomBounds()
      return baseState
        .slice(0, start)
        .concat(
          baseState.slice(start, end)
            .map(todo => ({
              ...todo,
              done: true,
            })),
          baseState.slice(end),
        )
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      const [start, end] = randomBounds()
      immutableState.withMutations(state => {
        for (let i = start; i < end; i++) state.setIn([i, 'done'], true)
      })
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      const [start, end] = randomBounds()
      return seamlessState
        .slice(0, start)
        .concat(
          seamlessState.slice(start, end)
            .map(todo => todo.set('done', true)),
          seamlessState.slice(end),
        )
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      const [start, end] = randomBounds()
      return immer(baseState, draft => {
        for (let i = start; i < end; i++) draft[i].done = true
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      const [start, end] = randomBounds()
      return qim.set([qim.$slice(start, end), qim.$each, 'done'], true, baseState)
    })
  })

  it('immutadot', () => {
    benchmark('immutadot', () => {
      const [start, end] = randomBounds()
      return set(baseState, `[${start}:${end}].done`, true)
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      const [start, end] = randomBounds()
      return qim.set([qim.$slice(start, end), qim.$each, 'done'])(true)(baseState)
    })
  })

  it('immutadot curried', () => {
    benchmark('immutadot-curried', () => {
      const [start, end] = randomBounds()
      return set(`[${start}:${end}].done`)(true)(baseState)
    })
  })
}
