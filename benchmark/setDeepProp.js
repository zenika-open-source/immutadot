import { BenchmarkJob, Column } from 'benchmark-node'
import * as qim from 'qim'
import * as immer from 'immer'
import * as immutadot2 from 'immutadot2/core/index.js'
import * as immutadot3 from 'immutadot3/dist/immutadot.js'
import * as immutadot3Dev from '../dist/immutadot.js'

immer.setAutoFreeze(false)

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

new BenchmarkJob({
  columns: [Column.Ops],
})
  .add('vanilla', () => {
    return {
      ...baseState,
      nested1: {
        ...baseState.nested1,
        arr1: [
          {
            ...baseState.nested1.arr1[0],
            nested2: {
              ...baseState.nested1.arr1[0].nested2,
              arr2: [
                {
                  ...baseState.nested1.arr1[0].nested2.arr2[0],
                  nested3: {
                    ...baseState.nested1.arr1[0].nested2.arr2[0].nested3,
                    arr3: [
                      {
                        ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0],
                        nested4: {
                          ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4,
                          arr4: [
                            {
                              ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0],
                              nested5: {
                                ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5,
                                arr5: [
                                  {
                                    ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0],
                                    nested6: {
                                      ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6,
                                      arr6: [
                                        {
                                          ...baseState.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0],
                                          prop: 'bar',
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }
  })
  .add('qim', () => {
    return qim.set(
      ['nested1', 'arr1', 0, 'nested2', 'arr2', 0, 'nested3', 'arr3', 0, 'nested4', 'arr4', 0, 'nested5', 'arr5', 0, 'nested6', 'arr6', 0, 'prop'],
      'bar',
      baseState,
    )
  })
  .add('immer', () => {
    return immer.produce(baseState, (draft) => {
      draft.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop = 'bar'
    })
  })
  .add('immutadot2', () => {
    return immutadot2.set(baseState, 'nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop', 'bar')
  })
  .add('immutadot3', () => {
    return immutadot3.set`${baseState}.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')
  })
  .add('immutadot3 dev', () => {
    return immutadot3Dev.set`${baseState}.nested1.arr1[0].nested2.arr2[0].nested3.arr3[0].nested4.arr4[0].nested5.arr5[0].nested6.arr6[0].prop`('bar')
  })
  .run()
