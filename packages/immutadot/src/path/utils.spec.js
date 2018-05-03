/* eslint-env jest */
import {
  getSliceBounds,
  pathAlreadyApplied,
} from './utils'

import {
  index,
  list,
  prop,
  slice,
} from '@immutadot/parser'

describe('path utils', () => {
  describe('path.getSliceBounds', () => {
    it('should return actual slice bounds', () => {
      expect(getSliceBounds([
        0,
        undefined,
      ], 0)).toEqual([
        0,
        0,
      ])
      expect(getSliceBounds([-2, -1], 0)).toEqual([
        0,
        0,
      ])
      expect(getSliceBounds([
        1,
        2,
      ], 0)).toEqual([
        1,
        2,
      ])
      expect(getSliceBounds([
        0,
        undefined,
      ], 6)).toEqual([
        0,
        6,
      ])
      expect(getSliceBounds([
        1, -1,
      ], 6)).toEqual([
        1,
        5,
      ])
      expect(getSliceBounds([
        7,
        8,
      ], 6)).toEqual([
        7,
        8,
      ])
    })
  })

  describe('path.pathAlreadyApplied', () => {
    it('should return true if path is included in already applied paths', () => {
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            prop,
            'bar',
          ],
        ],
      ])).toBe(true)
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            prop,
            'bar',
          ],
          [
            prop,
            'baz',
          ],
        ],
      ])).toBe(true)
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [],
        [
          [
            prop,
            'bar',
          ],
        ],
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            prop,
            'bar',
          ],
          [
            prop,
            'baz',
          ],
        ],
      ])).toBe(true)
      expect(pathAlreadyApplied([], [
        [
          [
            prop,
            'foo',
          ],
        ],
      ])).toBe(true)
    })
    it('should return false if path isn\'t included in already applied paths', () => {
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [])).toBe(false)
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
        ],
      ])).toBe(false)
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            prop,
            'baz',
          ],
        ],
      ])).toBe(false)
    })
    it('should return false if already applied paths contain slices or lists', () => {
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            prop,
            'bar',
          ],
          [
            prop,
            'baz',
          ],
          [
            slice, [
              0,
              10,
            ],
          ],
        ],
      ])).toBe(false)
      expect(pathAlreadyApplied([
        [
          prop,
          'foo',
        ],
        [
          index,
          123,
        ],
        [
          prop,
          'bar',
        ],
      ], [
        [
          [
            prop,
            'foo',
          ],
          [
            index,
            123,
          ],
          [
            list, [
              'bar',
              'baz',
            ],
          ],
        ],
      ])).toBe(false)
    })
  })
})
