import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should extract special chars from input', () => {
    expect([...new Lexer('.?.[:]')]).toEqual([
      [TokenType.Dot],
      [TokenType.OptDot],
      [TokenType.LBracket],
      [TokenType.Colon],
      [TokenType.RBracket],
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
    expect([...new Lexer('[123][456:-789]')]).toEqual([
      [TokenType.LBracket],
      [TokenType.Integer, '123'],
      [TokenType.RBracket],
      [TokenType.LBracket],
      [TokenType.Integer, '456'],
      [TokenType.Colon],
      [TokenType.Integer, '-789'],
      [TokenType.RBracket],
    ])
  })
})
