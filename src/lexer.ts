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

    // https://www.ecma-international.org/ecma-262/11.0/index.html#sec-literals-numeric-literals
    // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
    if (this.#afterInteger) {
      this.#afterInteger = false

      if (isDecimalDigit(this.#ch) || isIdentifierStart(this.#ch)) {
        token = [TokenType.Illegal, this.#ch, this.#position, 'a numeric literal must not be immediately followed by an identifier start or decimal digit']
        this.readChar()
        return { value: token }
      }
    }

    this.skipWhitespaces()

    switch (this.#ch) {
      case undefined: return { done: true, value: null }
      case '.': token = [TokenType.Dot, undefined, this.#position]; break
      case '?': token = this.readOptDot(); break
      case '[': token = [TokenType.LBracket, undefined, this.#position]; break
      case ':': token = [TokenType.Colon, undefined, this.#position]; break
      case ']': token = [TokenType.RBracket, undefined, this.#position]; break
      case '-': token = [TokenType.Minus, undefined, this.#position]; break
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
            token = [TokenType.Integer, 0, this.#position]
        }
        break
      case '"':
      case "'":
        token = this.readString()
        break
      case '$':
      case '_':
        return { value: this.readIdentifier() }
      default:
        if (isNonZeroDigit(this.#ch)) {
          this.#afterInteger = true
          return { value: this.readDecimalInteger() }
        }
        if (isIdentifierStart(this.#ch)) return { value: this.readIdentifier() }
        token = [TokenType.Illegal, this.#ch, this.#position]
    }

    this.readChar()

    return { value: token }
  }

  private skipWhitespaces() {
    while (isWhitespace(this.#ch)) this.readChar()
  }

  private readOptDot(): Token {
    this.readChar()
    return this.#ch === '.'
      ? [TokenType.OptDot, undefined, this.#position - 1]
      : [TokenType.Illegal, `?${this.#ch}`, this.#position - 1, '? must be followed by .']
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-DecimalIntegerLiteral
  private readDecimalInteger(): Token {
    const position = this.#position
    do { this.readChar() } while (isDecimalDigit(this.#ch))
    return [TokenType.Integer, Number(this.#source.slice(position, this.#position)), position]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-BinaryIntegerLiteral
  private readBinaryInteger(): Token {
    const position = this.#position
    this.readChar()
    this.readChar()
    const ch = this.#ch
    this.readChar()
    if (!isBinaryDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position), position, 'expected binary digit']
    while (isBinaryDigit(this.#ch)) { this.readChar() }
    return [TokenType.Integer, Number(this.#source.slice(position, this.#position)), position]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-OctalIntegerLiteral
  private readOctalInteger(): Token {
    const position = this.#position
    this.readChar()
    this.readChar()
    const ch = this.#ch
    this.readChar()
    if (!isOctalDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position), position, 'expected octal digit']
    while (isOctalDigit(this.#ch)) { this.readChar() }
    return [TokenType.Integer, Number(this.#source.slice(position, this.#position)), position]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-HexIntegerLiteral
  private readHexInteger(): Token {
    const position = this.#position
    this.readChar()
    this.readChar()
    const ch = this.#ch
    this.readChar()
    if (!isHexDigit(ch)) return [TokenType.Illegal, this.#source.slice(position, this.#position), position, 'expected hexadecimal digit']
    while (isHexDigit(this.#ch)) { this.readChar() }
    return [TokenType.Integer, Number(this.#source.slice(position, this.#position)), position]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#sec-literals-string-literals
  // Simplified: only supports escaping the following characters: " ' \
  private readString(): Token {
    const position = this.#position
    const delim = this.#ch
    do {
      this.readChar()
      while (this.#ch === '\\') {
        this.readChar()
        this.readChar()
      }
    } while (this.#ch !== undefined && this.#ch !== delim)
    if (this.#ch === undefined) return [TokenType.Illegal, this.#source.slice(position, this.#position), position]
    return [TokenType.String, this.#source.slice(position + 1, this.#position).replace(/\\(.)/g, '$1'), position]
  }

  // https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierName
  private readIdentifier(): Token {
    const position = this.#position
    do { this.readChar() } while (isIdentifierPart(this.#ch))
    return [TokenType.Identifier, this.#source.slice(position, this.#position), position]
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
const unicodeIDStart = /\p{ID_Start}/u

function isIdentifierStart(ch: string) {
  if (ch === undefined) return false
  return ch === '$' || ch === '_' || unicodeIDStart.test(ch)
}

// https://www.ecma-international.org/ecma-262/11.0/index.html#prod-IdentifierPart
const unicodeIDContinue = /[$\p{ID_Continue}\u200c\u200d]/u

function isIdentifierPart(ch: string) {
  if (ch === undefined) return false
  return ch === '$' || unicodeIDContinue.test(ch)
}
