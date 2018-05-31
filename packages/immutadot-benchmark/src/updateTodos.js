/* eslint-env jest */
import { $each, $slice, set as qimSet } from 'qim'

import { List, Record } from 'immutable'

import immer, { setAutoFreeze } from 'immer'

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
  const todoRecord = Record({
    todo: '',
    done: false,
    someThingCompletelyIrrelevant: [],
  })
  const immutableState = List(baseState.map(todo => todoRecord(todo)))

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
      return qimSet([$slice(start, end), $each, 'done'], true, baseState)
    })
  })

  it('immutad●t', () => {
    benchmark('immutadot', () => {
      const [start, end] = randomBounds()
      return set(baseState, `[${start}:${end}].done`, true)
    })
  })
}
