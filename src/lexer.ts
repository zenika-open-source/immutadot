import { Token, TokenType } from './token'

export default class Lexer implements IterableIterator<Token> {
  #source: string

  #position: number

  #readPosition = 0

  #ch: string

  #afterInteger = false

  constructor(source: string) {
    this.#source = source
    this.readChar()
  }

  next(): IteratorResult<Token> {
    let token: Token

    if (this.#afterInteger) {
      this.#afterInteger = false
      if (isNonZeroDigit(this.#ch)) {
        const [, literal] = this.readDecimalInteger()
        return { value: [TokenType.Illegal, literal] }
      }
      if (isIdentifierStart(this.#ch)) {
        const [, literal] = this.readIdentifier()
        return { value: [TokenType.Illegal, literal] }
      }
    }

    this.skipWhitespaces()

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
      case '-': token = [TokenType.Minus]; break
      case '0':
        this.#afterInteger = true
        switch (this.peekChar()) {
          case 'b':
          case 'B':
            return { value: this.readBinaryInteger() }
          case 'o':
          case 'O':
            return { value: this.readOctalInteger() }
          case 'x':
          case 'X':
            return { value: this.readHexInteger() }
          default:
            token = [TokenType.Integer, '0']
        }
        break
      case '$':
      case '_':
        return { value: this.readIdentifier() }
      default:
        if (isNonZeroDigit(this.#ch)) return { value: this.readDecimalInteger() }
        if (isIdentifierStart(this.#ch)) return { value: this.readIdentifier() }
        token = [TokenType.Illegal, this.#ch]
    }

    this.readChar()

    return { value: token }
  }

  private skipWhitespaces() {
    while (isWhitespace(this.#ch)) this.readChar()
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierName
  private readIdentifier(): Token {
    const position = this.#position
    do { this.readChar() } while (isIdentifierPart(this.#ch))
    return [TokenType.Identifier, this.#source.slice(position, this.#position)]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-DecimalIntegerLiteral
  private readDecimalInteger(): Token {
    const position = this.#position
    do { this.readChar() } while (isDecimalDigit(this.#ch))
    return [TokenType.Integer, this.#source.slice(position, this.#position)]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-BinaryIntegerLiteral
  private readBinaryInteger(): Token {
    const position = this.#position
    this.readChar()
    const ch = this.peekChar()
    if (!isBinaryDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position)]
    do { this.readChar() } while (isBinaryDigit(this.#ch))
    return [TokenType.Integer, this.#source.slice(position, this.#position)]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-OctalIntegerLiteral
  private readOctalInteger(): Token {
    const position = this.#position
    this.readChar()
    const ch = this.peekChar()
    if (!isOctalDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position)]
    do { this.readChar() } while (isOctalDigit(this.#ch))
    return [TokenType.Integer, this.#source.slice(position, this.#position)]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-HexIntegerLiteral
  private readHexInteger(): Token {
    const position = this.#position
    this.readChar()
    const ch = this.peekChar()
    if (!isHexDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position)]
    do { this.readChar() } while (isHexDigit(this.#ch))
    return [TokenType.Integer, this.#source.slice(position, this.#position)]
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

// https://www.ecma-international.org/ecma-262/11.0/index.html#sec-white-space
function isWhitespace(ch: string) {
  return ch === ' ' || ch === '\t' || ch === '\u000b' || ch === '\u000c' || ch === '\u00a0' || ch === '\ufeff' || /\p{Zs}/u.test(ch)
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-NonZeroDigit
function isNonZeroDigit(ch: string) {
  return ch >= '1' && ch <= '9'
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-DecimalDigit
function isDecimalDigit(ch: string) {
  return ch >= '0' && ch <= '9'
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-BinaryDigit
function isBinaryDigit(ch: string) {
  return ch === '0' || ch === '1'
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-OctalDigit
function isOctalDigit(ch: string) {
  return ch >= '0' && ch <= '7'
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-OctalDigit
function isHexDigit(ch: string) {
  return isDecimalDigit(ch) || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F')
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierStart
const identifierStart = /\p{ID_Start}/u

function isIdentifierStart(ch: string) {
  return ch !== undefined && identifierStart.test(ch)
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierPart
const identifierPart = /[$\p{ID_Continue}\u200c\u200d]/u

function isIdentifierPart(ch: string) {
  return ch !== undefined && identifierPart.test(ch)
}
