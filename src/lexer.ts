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
    let token: Token

    switch (this.#ch) {
      case undefined: return { done: true, value: null }
      case '.': token = [TokenType.Dot]; break
      case '?':
        if (this.peekChar() === '.') {
          token = [TokenType.OptDot]
          this.readChar()
        } else {
          token = [TokenType.Illegal, '?']
        }
        break
      case '[': token = [TokenType.LBracket]; break
      case ':': token = [TokenType.Colon]; break
      case ']': token = [TokenType.RBracket]; break
      case '-':
        if (isDigit(this.peekChar())) return { value: [TokenType.Integer, this.readInteger()] }
        token = [TokenType.Illegal, '-']
        break
      case '$':
      case '_':
        return { value: [TokenType.Identifier, this.readIdentifier()] }
      default:
        // FIXME follow numeric literals from https://www.ecma-international.org/ecma-262/11.0/index.html#sec-literals-numeric-literals
        if (isDigit(this.#ch)) return { value: [TokenType.Integer, this.readInteger()] }
        if (isUnicodeIDStart(this.#ch)) return { value: [TokenType.Identifier, this.readIdentifier()] }
        // FIXME identifier starting with unicode escape sequence
        token = [TokenType.Illegal, this.#ch]
    }

    this.readChar()

    return { value: token }
  }

  private readIdentifier(): string {
    const position = this.#position
    do { this.readChar() } while (this.#ch !== undefined && isIdentifierPart(this.#ch))
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

  private peekChar() {
    return this.#source[this.#readPosition]
  }

  [Symbol.iterator](): IterableIterator<Token> {
    return this
  }
}

function isDigit(char: string) {
  return char >= '0' && char <= '9'
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-UnicodeIDStart
const unicodeIDStart = /[\p{ID_Start}]/u

function isUnicodeIDStart(char: string) {
  return unicodeIDStart.test(char)
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierPart
const identifierPart = /[$\p{ID_Continue}\u200c\u200d]/u

function isIdentifierPart(char: string) {
  return identifierPart.test(char)
}
