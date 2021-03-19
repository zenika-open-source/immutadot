import { lex } from './lex'
import { IndexNavigator, Navigator, NavigatorType, Path, PropNavigator, SliceNavigator } from './path'
import { Token, TokenType } from './token'

export function parse(chunks: readonly string[], args: any[]): Path {
  return [...new Parser(chunks, args)]
}

class Parser implements IterableIterator<Navigator> {
  #chunks: readonly string[]

  #args: any[]

  #chunkIndex = -1

  #chunkTokens: Token[]

  #chunkTokenIndex: number

  #token: Token

  #nextToken: Token

  constructor(chunks: readonly string[], args: any[]) {
    this.#chunks = chunks
    this.#args = args
    this.nextChunk()
    this.readToken()
    this.readToken()
  }

  next(): IteratorResult<Navigator> {
    if (this.#token === undefined) return { done: true, value: null }

    let navigator: Navigator

    switch (this.#token[0]) {
      case TokenType.Dot:
        navigator = this.readProp()
        break
      case TokenType.LBracket:
        navigator = this.readBracket()
        break
      default: throw SyntaxError(`unexpected ${this.#token[0]}`)
    }

    this.readToken()

    return { value: navigator }
  }

  private readProp(): PropNavigator {
    this.readToken()
    this.assertTokenType(TokenType.Identifier)
    return [NavigatorType.Prop, this.#token[1]]
  }

  private readBracket(): Navigator {
    this.readToken()

    let navigator: Navigator
    switch (this.#token?.[0]) {
      case TokenType.Minus:
      case TokenType.Integer:
        navigator = this.readIndexOrSlice()
        break
      case TokenType.String:
      case TokenType.Symbol:
        navigator = [NavigatorType.Prop, this.#token[1]]
        break
      case TokenType.Colon:
        navigator = this.readSlice(undefined)
        break
      default: throw new SyntaxError(`unexpected ${this.#token?.[0] ?? 'EOF'} expected one of integer, string, symbol`)
    }

    this.readToken()
    this.assertTokenType(TokenType.RBracket)

    return navigator
  }

  private readIndexOrSlice(): IndexNavigator | SliceNavigator | PropNavigator {
    const n = this.readInteger()
    if (this.#nextToken?.[0] === TokenType.Colon) return this.readSlice(n)
    return n >= 0 ? [NavigatorType.Index, n] : [NavigatorType.Prop, n.toString()]
  }

  private readSlice(start: number): SliceNavigator {
    if (this.#nextToken[0] === TokenType.Colon) this.readToken()
    let end: number
    if (this.#nextToken?.[0] === TokenType.Integer || this.#nextToken?.[0] === TokenType.Minus) {
      this.readToken()
      end = this.readInteger()
    }
    return [NavigatorType.Slice, start, end]
  }

  private readInteger(): number {
    if (this.#token[0] === TokenType.Integer) return this.#token[1]
    this.readToken()
    // @ts-ignore: ts(2637) shitty type assertion
    if (this.#token[0] !== TokenType.Integer) throw new SyntaxError(`unexpected ${this.#token?.[0] ?? 'EOF'} expected integer`)
    return -this.#token[1]
  }

  private assertTokenType(...types: TokenType[]) {
    if (!types.includes(this.#token?.[0])) throw new SyntaxError(`unexpected ${this.#token?.[0] ?? 'EOF'} expected one of ${types}`)
  }

  private readToken() {
    this.#token = this.#nextToken

    if (this.#chunkTokens === undefined) {
      this.#nextToken = undefined
      return
    }

    if (this.#chunkTokenIndex < this.#chunkTokens.length) {
      this.#nextToken = this.#chunkTokens[this.#chunkTokenIndex++]
      return
    }

    if (this.#chunkIndex === this.#args.length) {
      this.#chunkTokens = undefined
      this.#nextToken = undefined
      return
    }

    const arg = this.#args[this.#chunkIndex]
    switch (typeof arg) {
      case 'number':
        // FIXME check arg is an integer
        this.#nextToken = [TokenType.Integer, arg, 0] // FIXME position
        break
      case 'string':
        this.#nextToken = [TokenType.String, arg, 0] // FIXME position
        break
      case 'symbol':
        this.#nextToken = [TokenType.Symbol, arg, 0] // FIXME position
        break
      default: throw TypeError(`unexpected argument ${arg}`)
    }

    this.nextChunk()
  }

  private nextChunk() {
    this.#chunkTokens = lex(this.#chunks[++this.#chunkIndex])
    this.#chunkTokenIndex = 0
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
