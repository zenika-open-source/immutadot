/* eslint-env jest */
import { toPath } from 'core'

describe('ToPath', () => {

  it('should convert basic path', () => {
    expect(toPath('a.22.ccc')).toEqual(['a', '22', 'ccc'])
    // Empty properties should be kept
    expect(toPath('.')).toEqual(['', ''])
    expect(toPath('..')).toEqual(['', '', ''])
    // If no separators, path should be interpreted as one property
    expect(toPath('\']"\\')).toEqual(['\']"\\'])
  })

  it('should convert array notation path', () => {
    expect(toPath('[0]["1.2"][\'[1.2]\']["[\\"1.2\\"]"][1a][1[2]')).toEqual([0, '1.2', '[1.2]', '["1.2"]', '1a', '1[2'])
    // Empty unterminated array notation should be discarded
    expect(toPath('[0][')).toEqual([0])
    expect(toPath('[0]["')).toEqual([0])
    // Unterminated array notation should be kept as string
    expect(toPath('[0][1')).toEqual([0, '1'])
    // Unterminated quoted array notation should be kept
    expect(toPath('[0]["1')).toEqual([0, '1'])
  })

  it('should convert slice notation path', () => {
    expect(toPath('[:][1:][:-2][3:4]')).toEqual([
      [undefined, undefined],
      [1, undefined],
      [undefined, -2],
      [3, 4],
    ])
    expect(toPath('[1:2:3][1:a]')).toEqual(['1:2:3', '1:a'])
  })

  it('should convert mixed path', () => {
    expect(toPath('a[0]["b.c"].666[1:]')).toEqual(['a', 0, 'b.c', '666', [1, undefined]])
    expect(toPath('a.[0].["b.c"]666[0.a[1')).toEqual(['a', 0, 'b.c', '666', '0', 'a', '1'])
  })

  it('should not convert array path', () => {
    expect(toPath([
      666,
      -666,
      Symbol.for('🍺'),
      true,
      'test',
      [1, undefined],
      [0, -2],
      [1, 2, 3],
      ['1', 2],
    ])).toEqual([
      666,
      '-666',
      Symbol.for('🍺'),
      'true',
      'test',
      [1, undefined],
      [0, -2],
      '1,2,3',
      '1,2',
    ])
  })
})
