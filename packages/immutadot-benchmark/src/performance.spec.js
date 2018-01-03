/* eslint-env jest */
// initial source: https://github.com/mweststrate/immer/blob/2a1da31f8d0408857697c04f6a683fd955ab7a06/__tests__/performance.js

'use strict'
import {
  List,
  Record,
} from 'immutable'
import immer, { setAutoFreeze } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import fpSet from 'lodash/fp/set'
import { set } from 'immutadot/core'

describe('performance', () => {
  const MAX = 100000
  const MODIFY_FACTOR = 0.1
  const baseState = []

  // produce the base state
  for (let i = 0; i < MAX; i++) {
    baseState.push({
      todo: `todo_${i}`,
      done: false,
      someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    })
  }

  // Produce the frozen bazeState
  const frozenBazeState = baseState.map(todo => {
    const newTodo = { ...todo }
    newTodo.someThingCompletelyIrrelevant = todo.someThingCompletelyIrrelevant.slice()
    Object.freeze(newTodo.someThingCompletelyIrrelevant)
    Object.freeze(newTodo)
    return newTodo
  })
  Object.freeze(frozenBazeState)

  // generate immutalbeJS base state
  const todoRecord = Record({
    todo: '',
    done: false,
    someThingCompletelyIrrelevant: [],
  })
  const immutableJsBaseState = List(baseState.map(todo => todoRecord(todo)))

  // The benchmarks

  it('just mutate', () => {
    for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
      baseState[i].done = true
  })

  it('deepclone, then mutate', () => {
    const draft = cloneDeep(baseState)
    for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
      draft[i].done = true
  })

  it('lodash/fp', () => {
    let draft = baseState
    for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
      draft = fpSet(`[${i}].done`, true, draft)
  })

  it('handcrafted reducer', () => {
    // eslint-disable-next-line no-unused-vars
    const nextState = [
      ...baseState.slice(0, MAX * MODIFY_FACTOR).map(todo => ({
        ...todo,
        done: true,
      })),
      ...baseState.slice(MAX * MODIFY_FACTOR),
    ]
  })

  it('immutableJS', () => {
    const state = immutableJsBaseState
    state.withMutations(state => {
      for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
        state.setIn([i, 'done'], true)
    })
  })

  it('immer', () => {
    setAutoFreeze(false)
    immer(baseState, draft => {
      for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
        draft[i].done = true
    })
    setAutoFreeze(true)
  })

  it('immutadot', () => {
    set(baseState, `[:${MAX * MODIFY_FACTOR}].done`, true)
  })
})
