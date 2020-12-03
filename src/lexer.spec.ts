import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should tokenize special characters', () => {
    expect([...new Lexer('.?.[:]-')]).toEqual([
      [TokenType.Dot, undefined, 0],
      [TokenType.OptDot, undefined, 1],
      [TokenType.LBracket, undefined, 3],
      [TokenType.Colon, undefined, 4],
      [TokenType.RBracket, undefined, 5],
      [TokenType.Minus, undefined, 6],
    ])
  })

  it('should tokenize identifiers', () => {
    expect([...new Lexer('foo _bar')]).toEqual([
      [TokenType.Identifier, 'foo', 0],
      [TokenType.Identifier, '_bar', 4],
    ])
  })

  it('should tokenize integer literals', () => {
    expect([...new Lexer('123 456 -789 0')]).toEqual([
      [TokenType.Integer, 123, 0],
      [TokenType.Integer, 456, 4],
      [TokenType.Minus, undefined, 8],
      [TokenType.Integer, 789, 9],
      [TokenType.Integer, 0, 13],
    ])

    expect([...new Lexer('0b0 0B101110 0b00000010')]).toEqual([
      [TokenType.Integer, 0b0, 0],
      [TokenType.Integer, 0B101110, 4],
      [TokenType.Integer, 0b00000010, 13],
    ])

    expect([...new Lexer('0o0 0O12345670 0o007')]).toEqual([
      [TokenType.Integer, 0o0, 0],
      [TokenType.Integer, 0O12345670, 4],
      [TokenType.Integer, 0o007, 15],
    ])

    expect([...new Lexer('0x0 0Xdada 0x0123ABCDEF')]).toEqual([
      [TokenType.Integer, 0x0, 0],
      [TokenType.Integer, 0Xdada, 4],
      [TokenType.Integer, 0x0123ABCDEF, 11],
    ])
  })

  it('should tokenize string literals', () => {
    expect([...new Lexer('"double quoted \'test\'" \'simple quoted "test"\' "double \\"escaped\\" \\"\\"" \'simple \\\'escaped\\\' \\\\\'')]).toEqual([
      [TokenType.String, "double quoted 'test'", 0],
      [TokenType.String, 'simple quoted "test"', 23],
      [TokenType.String, 'double "escaped" ""', 46],
      [TokenType.String, "simple 'escaped' \\", 72],
    ])
  })

  it('should return no token for empty string', () => {
    expect([...new Lexer('')]).toEqual([])
  })

  it('should return illegal for any unauthorized character', () => {
    expect([...new Lexer('#@%^!+()')]).toEqual([
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
    expect([...new Lexer('00 01 09')]).toEqual([
      [TokenType.Integer, 0, 0],
      [TokenType.Illegal, '0', 1, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 0, 3],
      [TokenType.Illegal, '1', 4, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 0, 6],
      [TokenType.Illegal, '9', 7, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
    ])
  })

  it('should return illegal for identifier start immediately following numeric literal', () => {
    expect([...new Lexer('0_ 1a 2$')]).toEqual([
      [TokenType.Integer, 0, 0],
      [TokenType.Illegal, '_', 1, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 1, 3],
      [TokenType.Illegal, 'a', 4, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
      [TokenType.Integer, 2, 6],
      [TokenType.Illegal, '$', 7, 'a numeric literal must not be immediately followed by an identifier start or decimal digit'],
    ])
  })

  it('should return illegal for anything other than dot following question mark', () => {
    expect([...new Lexer('?# ?a ?[')]).toEqual([
      [TokenType.Illegal, '?#', 0, '? must be followed by .'],
      [TokenType.Illegal, '?a', 3, '? must be followed by .'],
      [TokenType.Illegal, '?[', 6, '? must be followed by .'],
    ])
  })

  it('should return illegal for non binary digit following binary integer prefix', () => {
    expect([...new Lexer('0b2 0ba 0b_')]).toEqual([
      [TokenType.Illegal, '0b2', 0, 'expected binary digit'],
      [TokenType.Illegal, '0ba', 4, 'expected binary digit'],
      [TokenType.Illegal, '0b_', 8, 'expected binary digit'],
    ])
  })

  it('should return illegal for non octal digit following octal integer prefix', () => {
    expect([...new Lexer('0o8 0oa 0o_')]).toEqual([
      [TokenType.Illegal, '0o8', 0, 'expected octal digit'],
      [TokenType.Illegal, '0oa', 4, 'expected octal digit'],
      [TokenType.Illegal, '0o_', 8, 'expected octal digit'],
    ])
  })

  it('should return illegal for non hexadecimal digit following hexadecimal integer prefix', () => {
    expect([...new Lexer('0xg 0x_')]).toEqual([
      [TokenType.Illegal, '0xg', 0, 'expected hexadecimal digit'],
      [TokenType.Illegal, '0x_', 4, 'expected hexadecimal digit'],
    ])
  })

  it('should return illegal for unterminated string literal', () => {
    expect([...new Lexer('"foo')]).toEqual([
      [TokenType.Illegal, '"foo', 0, 'unterminated string literal'],
    ])
  })
})
