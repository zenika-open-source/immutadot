import Lexer from './lexer'
import { TokenType } from './token'

describe('Lexer', () => {
  it('should extract tokens from input', () => {
    expect([...new Lexer('."\'[]')]).toEqual([
      { type: TokenType.Dot },
      { type: TokenType.DQuote },
      { type: TokenType.SQuote },
      { type: TokenType.LBracket },
      { type: TokenType.RBracket },
    ])
  })
})
