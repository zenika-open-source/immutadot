import { Token, TokenType } from './token'

export default class Lexer implements IterableIterator<Token> {
  #source: string

  #position: number

  #readPosition = 0

  #ch: number

  constructor(source: string) {
    this.#source = source
    this.readChar()
  }

  next(): IteratorResult<Token> {
    if (this.#readPosition > this.#source.length) return { done: true, value: null }
    const { token } = this
    this.readChar()
    return { value: token }
  }

  private readChar() {
    this.#ch = this.#source.charCodeAt(this.#position = this.#readPosition++)
  }

  private get token() {
    switch (this.#ch) {
      case 46: return { type: TokenType.Dot }
      case 34: return { type: TokenType.DQuote }
      case 39: return { type: TokenType.SQuote }
      case 91: return { type: TokenType.LBracket }
      case 93: return { type: TokenType.RBracket }
      default: throw TypeError(`unexpected character "${String.fromCharCode(this.#ch)}" at position ${this.#position}`)
    }
  }

  [Symbol.iterator](): IterableIterator<Token> {
    return this
  }
}
