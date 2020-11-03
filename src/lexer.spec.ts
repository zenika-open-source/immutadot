import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should extract special chars from input', () => {
    expect([...new Lexer('."\'[]')]).toEqual([
      [TokenType.Dot],
      [TokenType.DQuote],
      [TokenType.SQuote],
      [TokenType.LBracket],
      [TokenType.RBracket],
    ])
  })

  it('should extract identifier and numbers from input', () => {
    expect([...new Lexer('foo._bar[123]')]).toEqual([
      [TokenType.Identifier, 'foo'],
      [TokenType.Dot],
      [TokenType.Identifier, '_bar'],
      [TokenType.LBracket],
      [TokenType.Integer, '123'],
      [TokenType.RBracket],
    ])
  })
})
