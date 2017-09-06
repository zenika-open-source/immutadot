/* eslint-env jest */
import { toPath } from 'util'

describe('ToPath', () => {

  it('should convert basic path', () => {
    expect(toPath('a.bb.ccc')).toEqual(['a', 'bb', 'ccc'])
    expect(toPath('.')).toEqual(['', ''])
    expect(toPath('..')).toEqual(['', '', ''])
    expect(toPath('1.22.333')).toEqual(['1', '22', '333'])
    expect(toPath('\']"\\')).toEqual(['\']"\\'])
  })

  it('should convert array notation path', () => {
    expect(toPath('[0][1][2]')).toEqual([0, 1, 2])
    expect(toPath('[0]["1.2"]')).toEqual([0, '1.2'])
    expect(toPath('[0][\'[1.2]\']')).toEqual([0, '[1.2]'])
    expect(toPath('[0]["[\\"1.2\\"]"]')).toEqual([0, '["1.2"]'])
    // TODO add erroneous
    // TODO add unterminated brackets
    // TODO add unterminated escaped
  })

  it('should convert slice notation path', () => {
    expect(toPath('[:][1:][:2][3:4]')).toEqual([
      [undefined, undefined],
      [1, undefined],
      [undefined, 2],
      [3, 4],
    ])
    // TODO add negative
    // TODO add erroneous
  })

  it('should convert mixed path', () => {
    expect(toPath('a[0]["b.c"].666')).toEqual(['a', 0, 'b.c', '666'])
    expect(toPath('a.[0].["b.c"].666')).toEqual(['a', 0, 'b.c', '666'])
    // TODO add slices
    // TODO add erroneous (missing dot)
  })

  it('should not convert array path', () => {
    expect(toPath([666, Symbol.for('🍺'), true, 'test'])).toEqual([666, Symbol.for('🍺'), 'true', 'test'])
    // TODO add slices
  })
})
