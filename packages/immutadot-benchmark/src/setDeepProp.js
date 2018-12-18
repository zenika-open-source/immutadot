/* eslint-env jest */
import * as qim from 'qim'
import immer, { setAutoFreeze } from 'immer'
import Immutable from 'immutable'
import Seamless from 'seamless-immutable/seamless-immutable.production.min'
import { set } from 'immutadot/core'

export function setDeepProp(benchmarkSuite) {
  // Prepare base state
  const baseState = {
    nested1: {
      arr1: [
        {
          nested2: {
            arr2: [
              {
                nested3: {
                  arr3: [
                    {
                      nested4: {
                        arr4: [
                          {
                            nested5: {
                              arr5: [
                                {
                                  nested6: {
                                    arr6: [
                                      {
                                        prop: 'foo',
                                        otherProp: 'aze',
                                      },
                                    ],
                                    otherProp: 'aze6',
                                  },
                                },
                              ],
                              otherProp: 'aze5',
                            },
                          },
                        ],
                        otherProp: 'aze4',
                      },
                    },
                  ],
                  otherProp: 'aze3',
                },
              },
            ],
            otherProp: 'aze2',
          },
        },
      ],
      otherProp: 'aze1',
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
    'Set a deeply nested property',
    (key, result) => {
      if (key === 'immutable') return
      expect(result).toEqual({
        nested1: {
          arr1: [
            {
              nested2: {
                arr2: [
                  {
                    nested3: {
                      arr3: [
                        {
                          nested4: {
                            arr4: [
                              {
                                nested5: {
                                  arr5: [
                                    {
                                      nested6: {
                                        arr6: [
                                          {
                                            prop: 'bar',
                                            otherProp: 'aze',
                                          },
                                        ],
                                        otherProp: 'aze6',
                                      },
                                    },
                                  ],
                                  otherProp: 'aze5',
                                },
                              },
                            ],
                            otherProp: 'aze4',
                          },
                        },
                      ],
                      otherProp: 'aze3',
                    },
                  },
                ],
                otherProp: 'aze2',
              },
            },
          ],
          otherProp: 'aze1',
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
        nested1: {
          ...baseState.nested1,
          arr1: [{
            ...baseState.nested1.arr1[0],
            nested2: {
              ...baseState.nested1.arr1[0].nested2,
              arr2: [{
                ...baseState.nested1.arr1[0].nested2.arr2[0],
                nested3: {
                  ...baseState.nested1.arr1[0].nested2.arr2[0].nested3,
                  arr3: [{
                    ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0],
                    nested4: {
                      ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4,
                      arr4: [{
                        ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0],
                        nested5: {
                          ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5,
                          arr5: [{
                            ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0],
                            nested6: {
                              ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6,
                              arr6: [{
                                ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0],
                                prop: 'bar',
                              }],
                            },
                          }],
                        },
                      }],
                    },
                  }],
                },
              }],
            },
          }],
        },
      }
    })
  })

  it('immutable', () => {
    benchmark('immutable', () => {
      immutableState.setIn(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')
    })
  })

  it('seamless', () => {
    benchmark('seamless', () => {
      return Seamless.setIn(seamlessState, ['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar')
    })
  })

  it('immer', () => {
    benchmark('immer', () => {
      return immer(baseState, draft => {
        draft.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop = 'bar'
      })
    })
  })

  it('qim', () => {
    benchmark('qim', () => {
      return qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'], 'bar', baseState)
    })
  })

  it('immutad●t', () => {
    benchmark('immutadot', () => {
      return set(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')
    })
  })

  it('qim curried', () => {
    benchmark('qim-curried', () => {
      return qim.set(['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'])('bar')(baseState)
    })
  })

  it('immutad●t curried', () => {
    benchmark('immutadot-curried', () => {
      return set('nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop')('bar')(baseState)
    })
  })
}
