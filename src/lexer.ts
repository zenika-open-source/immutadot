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
    if (this.#readPosition > this.#source.length) return { done: true, value: null }

    let token: Token

    switch (this.#ch) {
      case '.': token = [TokenType.Dot]; break
      case '"': token = [TokenType.DQuote]; break
      case "'": token = [TokenType.SQuote]; break
      case '[': token = [TokenType.LBracket]; break
      case ']': token = [TokenType.RBracket]; break
      default:
        if (isLetter(this.#ch)) return { value: [TokenType.Identifier, this.readIdentifier()] }
        if (isDigit(this.#ch)) return { value: [TokenType.Integer, this.readInteger()] }
        token = [TokenType.Illegal, this.#ch]
    }

    this.readChar()

    return { value: token }
  }

  private readIdentifier(): string {
    const position = this.#position
    do { this.readChar() } while (isLetter(this.#ch))
    return this.#source.slice(position, this.#position)
  }

  private readInteger(): string {
    const position = this.#position
    do { this.readChar() } while (isDigit(this.#ch))
    return this.#source.slice(position, this.#position)
  }

  private readChar() {
    this.#ch = this.#source[this.#position = this.#readPosition++]
  }

  [Symbol.iterator](): IterableIterator<Token> {
    return this
  }
}

function isLetter(char: string) {
  return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || char === '_'
}

function isDigit(char: string) {
  return char >= '0' && char <= '9'
}
