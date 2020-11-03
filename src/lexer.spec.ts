import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should extract special chars from input', () => {
    expect([...new Lexer('."\'[]')]).toEqual([
      { type: TokenType.Dot },
      { type: TokenType.DQuote },
      { type: TokenType.SQuote },
      { type: TokenType.LBracket },
      { type: TokenType.RBracket },
    ])
  })

  it('should extract identifier and numbers from input', () => {
    expect([...new Lexer('foo._bar[123]')]).toEqual([
      { type: TokenType.Identifier, literal: 'foo' },
      { type: TokenType.Dot },
      { type: TokenType.Identifier, literal: '_bar' },
      { type: TokenType.LBracket },
      { type: TokenType.Integer, literal: '123' },
      { type: TokenType.RBracket },
    ])
  })
})
