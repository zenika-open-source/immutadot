import { Token, TokenType } from './token'

export default class Lexer implements IterableIterator<Token> {
  #source: string

  #position: number

  #readPosition = 0

  #ch: string

  constructor(source: string) {
    this.#source = source
    this.readChar()
  }

  next(): IteratorResult<Token> {
    const { token } = this
    this.readChar()
    return token
  }

  private readChar() {
    this.#ch = this.#source[this.#position = this.#readPosition++]
  }

  private get token() {
    switch (this.#ch) {
      case '.': return { value: { type: TokenType.Dot } }
      case '"': return { value: { type: TokenType.DQuote } }
      case "'": return { value: { type: TokenType.SQuote } }
      case '[': return { value: { type: TokenType.LBracket } }
      case ']': return { value: { type: TokenType.RBracket } }
      case undefined: return { done: true, value: null }
      default: throw TypeError(`unexpected character "${this.#ch}"`)
    }
  }

  [Symbol.iterator](): IterableIterator<Token> {
    return this
  }
}
