/* eslint-env jest */
'use strict'

// Initial source: https://github.com/mweststrate/immer/blob/2a1da31f8d0408857697c04f6a683fd955ab7a06/__tests__/performance.js

import { List, Record } from 'immutable'

import immer, { setAutoFreeze } from 'immer'

import cloneDeep from 'lodash/cloneDeep'

import { set } from 'immutadot/core'

describe('Benchmarks', () => {

  describe('Update todos list', () => {
    const MAX = 100000
    const MODIFY_FACTOR = 0.1

    // Prepare base state
    const baseState = []
    for (let i = 0; i < MAX; i++) {
      baseState.push({
        todo: `todo_${i}`,
        done: false,
        someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      })
    }

    // Prepare frozen state
    const frozenState = Object.freeze(baseState.map(todo => Object.freeze({
      ...todo,
      someThingCompletelyIrrelevant: Object.freeze([...todo.someThingCompletelyIrrelevant]),
    })))

    // Prepare immutalbe state
    const todoRecord = Record({
      todo: '',
      done: false,
      someThingCompletelyIrrelevant: [],
    })
    const immutableState = List(frozenState.map(todo => todoRecord(todo)))

    // Disable immer auto freeze
    setAutoFreeze(false)

    // Prepare expectd state
    const expectedState = []
    for (let i = 0; i < MAX; i++) {
      expectedState.push({
        todo: `todo_${i}`,
        done: i < MAX * MODIFY_FACTOR,
        someThingCompletelyIrrelevant: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      })
    }

    it('with mutation', () => {
      for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
        baseState[i].done = true
    })

    let deepCloneActual
    it('with deep cloning, then mutation', () => {
      deepCloneActual = cloneDeep(frozenState)
      for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
        deepCloneActual[i].done = true
    })

    let es2015Actual
    it('with ES2015 destructuring', () => {
      es2015Actual = frozenState
        .slice(0, MAX * MODIFY_FACTOR)
        .map(todo => ({
          ...todo,
          done: true,
        }))
        .concat(frozenState.slice(MAX * MODIFY_FACTOR))
    })

    it('with immutable (w/o conversion to plain JS objects)', () => {
      immutableState.withMutations(state => {
        for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
          state.setIn([i, 'done'], true)
      })
    })

    let immutableActual
    it('with immutable (w/ conversion to plain JS objects)', () => {
      immutableActual = immutableState.withMutations(state => {
        for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
          state.setIn([i, 'done'], true)
      }).toJS()
    })

    let immerActual
    it('with immer (proxy implementation w/o autofreeze)', () => {
      immerActual = immer(frozenState, draft => {
        for (let i = 0; i < MAX * MODIFY_FACTOR; i++)
          draft[i].done = true
      })
    })

    let immutadotActual
    it('with immutad●t', () => {
      immutadotActual = set(frozenState, `[:${MAX * MODIFY_FACTOR}].done`, true)
    })

    it('check produced todos lists', () => {
      expect(baseState).toEqual(expectedState)
      expect(deepCloneActual).toEqual(expectedState)
      expect(es2015Actual).toEqual(expectedState)
      expect(immutableActual).toEqual(expectedState)
      expect(immerActual).toEqual(expectedState)
      expect(immutadotActual).toEqual(expectedState)
    })
  })
})
