import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should extract special chars from input', () => {
    expect([...new Lexer('.?.[:]-')]).toEqual([
      [TokenType.Dot],
      [TokenType.OptDot],
      [TokenType.LBracket],
      [TokenType.Colon],
      [TokenType.RBracket],
      [TokenType.Minus],
    ])
  })

  it('should extract identifiers from input', () => {
    expect([...new Lexer('foo._bar')]).toEqual([
      [TokenType.Identifier, 'foo'],
      [TokenType.Dot],
      [TokenType.Identifier, '_bar'],
    ])
  })

  it('should extract integers from input', () => {
    expect([...new Lexer('123.456.-789.0')]).toEqual([
      [TokenType.Integer, '123'],
      [TokenType.Dot],
      [TokenType.Integer, '456'],
      [TokenType.Dot],
      [TokenType.Minus],
      [TokenType.Integer, '789'],
      [TokenType.Dot],
      [TokenType.Integer, '0'],
    ])

    expect([...new Lexer('0b0.0B101110.0b00000010')]).toEqual([
      [TokenType.Integer, '0b0'],
      [TokenType.Dot],
      [TokenType.Integer, '0B101110'],
      [TokenType.Dot],
      [TokenType.Integer, '0b00000010'],
    ])

    expect([...new Lexer('0o0.0O12345670.0o007')]).toEqual([
      [TokenType.Integer, '0o0'],
      [TokenType.Dot],
      [TokenType.Integer, '0O12345670'],
      [TokenType.Dot],
      [TokenType.Integer, '0o007'],
    ])

    expect([...new Lexer('0x0.0Xdada.0x0123ABCDEF')]).toEqual([
      [TokenType.Integer, '0x0'],
      [TokenType.Dot],
      [TokenType.Integer, '0Xdada'],
      [TokenType.Dot],
      [TokenType.Integer, '0x0123ABCDEF'],
    ])
  })
})
