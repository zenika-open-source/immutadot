import { lex } from './lex'
import { TokenType } from './token'

describe('lex', () => {
  it('should tokenize special characters', () => {
    expect(lex('.?.[:]-{}')).toEqual([
      [TokenType.Dot, undefined, 0],
      [TokenType.OptDot, undefined, 1],
      [TokenType.LBracket, undefined, 3],
      [TokenType.Colon, undefined, 4],
      [TokenType.RBracket, undefined, 5],
      [TokenType.Minus, undefined, 6],
      [TokenType.LCurly, undefined, 7],
      [TokenType.RCurly, undefined, 8],
    ])
  })

  it('should tokenize identifiers', () => {
    expect(lex('foo _bar')).toEqual([
      [TokenType.Identifier, 'foo', 0],
      [TokenType.Identifier, '_bar', 4],
    ])
  })

  it('should tokenize integer literals', () => {
    expect(lex('123 456 -789 0')).toEqual([
      [TokenType.Integer, 123, 0],
      [TokenType.Integer, 456, 4],
      [TokenType.Minus, undefined, 8],
      [TokenType.Integer, 789, 9],
      [TokenType.Integer, 0, 13],
    ])

    expect(lex('0b0 0B101110 0b00000010')).toEqual([
      [TokenType.Integer, 0b0, 0],
      [TokenType.Integer, 0B101110, 4],
      [TokenType.Integer, 0b00000010, 13],
    ])

    expect(lex('0o0 0O12345670 0o007')).toEqual([
      [TokenType.Integer, 0o0, 0],
      [TokenType.Integer, 0O12345670, 4],
      [TokenType.Integer, 0o007, 15],
    ])

    expect(lex('0x0 0Xdada 0x0123ABCDEF')).toEqual([
      [TokenType.Integer, 0x0, 0],
      [TokenType.Integer, 0Xdada, 4],
      [TokenType.Integer, 0x0123ABCDEF, 11],
    ])
  })

  it('should tokenize string literals', () => {
    expect(lex('"double quoted \'test\'" \'simple quoted "test"\' "double \\"escaped\\" \\"\\"" \'simple \\\'escaped\\\' \\\\\'')).toEqual([
      [TokenType.String, "double quoted 'test'", 0],
      [TokenType.String, 'simple quoted "test"', 23],
      [TokenType.String, 'double "escaped" ""', 46],
      [TokenType.String, "simple 'escaped' \\", 72],
    ])
  })

  it('should return no token for empty string', () => {
    expect(lex('')).toEqual([])
  })

  it('should return illegal for any unauthorized character', () => {
    expect(lex('#@%^!+()')).toEqual([
      [TokenType.Illegal, '#', 0],
      [TokenType.Illegal, '@', 1],
      [TokenType.Illegal, '%', 2],
      [TokenType.Illegal, '^', 3],
      [TokenType.Illegal, '!', 4],
      [TokenType.Illegal, '+', 5],
      [TokenType.Illegal, '(', 6],
      [TokenType.Illegal, ')', 7],
    ])
  })

  it('should return illegal for decimal digit immediately following numeric literal', () => {
    expect(lex('00 01 09')).toEqual([
      [TokenType.Integer, 0, 0],
      [TokenType.Illegal, '0', 1, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 0, 3],
      [TokenType.Illegal, '1', 4, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 0, 6],
      [TokenType.Illegal, '9', 7, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
    ])
  })

  it('should return illegal for identifier start immediately following numeric literal', () => {
    expect(lex('0_ 1a 2$')).toEqual([
      [TokenType.Integer, 0, 0],
      [TokenType.Illegal, '_', 1, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 1, 3],
      [TokenType.Illegal, 'a', 4, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 2, 6],
      [TokenType.Illegal, '$', 7, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
    ])
  })

  it('should return illegal for anything other than dot following question mark', () => {
    expect(lex('?# ?a ?[')).toEqual([
      [TokenType.Illegal, '?#', 0, '? must be followed by .'],
      [TokenType.Illegal, '?a', 3, '? must be followed by .'],
      [TokenType.Illegal, '?[', 6, '? must be followed by .'],
    ])
  })

  it('should return illegal for non binary digit following binary integer prefix', () => {
    expect(lex('0b2 0ba 0b_')).toEqual([
      [TokenType.Illegal, '0b2', 0, 'expected binary digit'],
      [TokenType.Illegal, '0ba', 4, 'expected binary digit'],
      [TokenType.Illegal, '0b_', 8, 'expected binary digit'],
    ])
  })

  it('should return illegal for non octal digit following octal integer prefix', () => {
    expect(lex('0o8 0oa 0o_')).toEqual([
      [TokenType.Illegal, '0o8', 0, 'expected octal digit'],
      [TokenType.Illegal, '0oa', 4, 'expected octal digit'],
      [TokenType.Illegal, '0o_', 8, 'expected octal digit'],
    ])
  })

  it('should return illegal for non hexadecimal digit following hexadecimal integer prefix', () => {
    expect(lex('0xg 0x_')).toEqual([
      [TokenType.Illegal, '0xg', 0, 'expected hexadecimal digit'],
      [TokenType.Illegal, '0x_', 4, 'expected hexadecimal digit'],
    ])
  })

  it('should return illegal for unterminated string literal', () => {
    expect(lex('"foo')).toEqual([
      [TokenType.Illegal, '"foo', 0, 'unterminated string literal'],
    ])
  })
})
