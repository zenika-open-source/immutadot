/* eslint-env jest */
import { toPath } from 'core'

describe('ToPath', () => {

  it('should convert basic path', () => {
    expect(toPath('a.22.ccc')).toEqual(['a', '22', 'ccc'])
    expect(toPath('.')).toEqual(['', ''])
    expect(toPath('..')).toEqual(['', '', ''])
    expect(toPath('\']"\\')).toEqual(['\']"\\'])
  })

  it('should convert array notation path', () => {
    expect(toPath('[0]["1.2"][\'[1.2]\']["[\\"1.2\\"]"][1a][1[2]')).toEqual([0, '1.2', '[1.2]', '["1.2"]', '1a', '1[2'])
    expect(toPath('[0][')).toEqual([0])
    expect(toPath('[0][1')).toEqual([0, '1'])
    expect(toPath('[0]["1')).toEqual([0, '1'])
  })

  it('should convert slice notation path', () => {
    expect(toPath('[:][1:][:-2][3:4][1:2:3][1:a]')).toEqual([
      [undefined, undefined],
      [1, undefined],
      [undefined, -2],
      [3, 4],
      '1:2:3',
      '1:a',
    ])
  })

  it('should convert mixed path', () => {
    expect(toPath('a[0]["b.c"].666[1:]')).toEqual(['a', 0, 'b.c', '666', [1, undefined]])
    expect(toPath('a.[0].["b.c"]666[0.a[1')).toEqual(['a', 0, 'b.c', '666', '0', 'a', '1'])
  })

  it('should not convert array path', () => {
    expect(toPath([666, Symbol.for('🍺'), true, 'test', [1, undefined], [1, 2, 3], ['1', 2]])).toEqual([666, Symbol.for('🍺'), 'true', 'test', [1, undefined], '1,2,3', '1,2'])
  })
})
