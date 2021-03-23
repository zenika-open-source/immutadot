import { lex } from './lex'
import { IndexNavigator, Navigator, NavigatorType, Path, PropNavigator, SliceNavigator } from './path'
import { Token, TokenType } from './token'

export function parse(chunks: readonly string[], args: any[]): Path {
  return Array.from(new Parser(chunks, args))
}

class Parser implements IterableIterator<Navigator> {
  chunks: readonly string[]

  args: any[]

  chunkIndex = -1

  chunkTokens: Token[]

  chunkTokenIndex: number

  chunkPos: number = 0

  token: Token

  nextToken: Token

  constructor(chunks: readonly string[], args: any[]) {
    this.chunks = chunks
    this.args = args
    this.nextChunk()
    this.readToken()
    this.readToken()
  }

  next(): IteratorResult<Navigator> {
    if (this.token === undefined) return { done: true, value: null }

    let navigator: Navigator

    switch (this.token[0]) {
      case TokenType.Dot:
        navigator = this.readProp()
        break
      case TokenType.LBracket:
        navigator = this.readBracket()
        break
      default: throw SyntaxError(`unexpected ${this.token[0]}`)
    }

    this.readToken()

    return { value: navigator }
  }

  private readProp(): PropNavigator {
    this.readToken()
    this.assertTokenType(TokenType.Identifier)
    return [NavigatorType.Prop, this.token[1]]
  }

  private readBracket(): Navigator {
    this.readToken()

    let navigator: Navigator
    switch (this.token?.[0]) {
      case TokenType.Minus:
      case TokenType.Integer:
        navigator = this.readIndexOrSlice()
        break
      case TokenType.String:
      case TokenType.Symbol:
        navigator = [NavigatorType.Prop, this.token[1]]
        break
      case TokenType.Colon:
        navigator = this.readSlice(undefined)
        break
      default: throw new SyntaxError(this.unexpectedTokenMessage([TokenType.Minus, TokenType.Integer, TokenType.String, TokenType.Symbol, TokenType.Colon]))
    }

    this.readToken()
    this.assertTokenType(TokenType.RBracket)

    return navigator
  }

  private readIndexOrSlice(): IndexNavigator | SliceNavigator | PropNavigator {
    const n = this.readInteger()
    if (this.nextToken?.[0] === TokenType.Colon) return this.readSlice(n)
    return n >= 0 ? [NavigatorType.Index, n] : [NavigatorType.Prop, n.toString()]
  }

  private readSlice(start: number): SliceNavigator {
    if (this.nextToken[0] === TokenType.Colon) this.readToken()
    let end: number
    if (this.nextToken?.[0] === TokenType.Integer || this.nextToken?.[0] === TokenType.Minus) {
      this.readToken()
      end = this.readInteger()
    }
    return [NavigatorType.Slice, start, end]
  }

  private readInteger(): number {
    if (this.token[0] === TokenType.Integer) return this.token[1]
    this.readToken()
    // @ts-ignore: ts(2637) shitty type assertion
    if (this.token[0] !== TokenType.Integer) throw new SyntaxError(this.unexpectedTokenMessage(TokenType.Integer))
    return -this.token[1]
  }

  private assertTokenType(...types: TokenType[]) {
    if (!types.includes(this.token?.[0])) throw new SyntaxError(this.unexpectedTokenMessage(types))
  }

  private readToken() {
    this.token = this.nextToken

    if (this.chunkTokens === undefined) {
      this.nextToken = undefined
      return
    }

    if (this.chunkTokenIndex < this.chunkTokens.length) {
      this.nextToken = this.chunkTokens[this.chunkTokenIndex++]
      return
    }

    if (this.chunkIndex === this.args.length) {
      this.chunkTokens = undefined
      this.nextToken = undefined
      return
    }

    const arg = this.args[this.chunkIndex]
    switch (typeof arg) {
      case 'number':
        // FIXME check arg is an integer
        this.nextToken = [TokenType.Integer, arg, this.chunks[this.chunkIndex].length + 3]
        break
      case 'string':
        this.nextToken = [TokenType.String, arg, this.chunks[this.chunkIndex].length + 3]
        break
      case 'symbol':
        this.nextToken = [TokenType.Symbol, arg, this.chunks[this.chunkIndex].length + 3]
        break
      default: throw TypeError(`unexpected argument ${arg}`) // FIXME improve error
    }

    this.nextChunk()
  }

  private nextChunk() {
    if (this.chunkIndex !== -1) this.chunkPos += this.chunks[this.chunkIndex].length + 4 + (typeof this.args[this.chunkIndex]).length
    this.chunkTokens = lex(this.chunks[++this.chunkIndex])
    this.chunkTokenIndex = 0
  }

  private unexpectedTokenMessage(expected: TokenType[]) {
    let message = `unexpected ${this.token?.[0] ?? 'EOF'}`
    if (this.token) message += ` at position ${this.token[2] + 1}`
    if (expected.length === 1) message += `, expected ${expected}`
    else message += `, expected one of ${expected}`
    return message
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
