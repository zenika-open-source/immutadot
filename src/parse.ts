import { Lexer } from './lex'
import {
  Navigator,
  PathArgument,
  NavigatorType,
  NavigatorVariable,
  NavigatorVariableType,
  Path,
  PropIndexNavigator,
  SliceNavigator,
} from './path'
import { Token, TokenType } from './token'

const cache = new Map<string, Path>()

export function parse(chunks: readonly string[]): Path {
  const source = chunks.reduce((acc, chunk, index) => `${acc}{${index - 1}}${chunk}`)
  if (cache.has(source)) return cache.get(source)
  const path = Array.from(new Parser(source))
  cache.set(source, path)
  return path
}

class Parser implements IterableIterator<Navigator> {
  lexer: Lexer

  token: Token

  nextToken: Token

  constructor(source: string) {
    this.lexer = new Lexer(source)
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
      case TokenType.OptDot:
        navigator = this.nextToken[0] === TokenType.LBracket ? this.readBracket() : this.readProp()
        break
      default: throw SyntaxError(`unexpected ${this.token[0]}`)
    }

    this.readToken()

    return { value: navigator }
  }

  private readProp(): PropIndexNavigator {
    const optional = this.token[0] === TokenType.OptDot
    this.readToken()
    this.assertTokenType(TokenType.Identifier)
    return [NavigatorType.PropIndex, this.token[1], optional]
  }

  private readBracket(): Navigator {
    const optional = this.token[0] === TokenType.OptDot
    if (optional) this.readToken()
    this.readToken()

    let navigator: Navigator
    switch (this.token?.[0]) {
      case TokenType.LCurly:
      case TokenType.Minus:
      case TokenType.Integer:
        navigator = this.readIndexOrSlice(optional)
        break
      case TokenType.String:
      case TokenType.Symbol:
        navigator = [NavigatorType.PropIndex, this.token[1], optional]
        break
      case TokenType.Colon:
        navigator = this.readSlice(undefined, optional)
        break
      default: throw new SyntaxError(this.unexpectedTokenMessage([
        TokenType.LCurly, TokenType.Minus, TokenType.Integer, TokenType.String, TokenType.Symbol, TokenType.Colon,
      ]))
    }

    this.readToken()
    this.assertTokenType(TokenType.RBracket)

    return navigator
  }

  private readIndexOrSlice(optional: boolean): PropIndexNavigator | SliceNavigator {
    const index = this.token?.[0] === TokenType.LCurly ? this.readArg() : this.readInteger()
    return this.nextToken?.[0] === TokenType.Colon ? this.readSlice(index, optional) : [NavigatorType.PropIndex, index, optional]
  }

  private readArg(): NavigatorVariable {
    this.readToken()
    if (this.token[0] !== TokenType.Integer) throw new SyntaxError(this.unexpectedTokenMessage([TokenType.Integer]))
    const index = this.token[1]
    this.readToken()
    this.assertTokenType(TokenType.RCurly)
    return [NavigatorVariableType.PathArgument, index]
  }

  private readSlice(start: number | PathArgument, optional: boolean): SliceNavigator {
    if (this.nextToken[0] === TokenType.Colon) this.readToken()
    let end: number | PathArgument
    if (this.nextToken?.[0] === TokenType.Integer || this.nextToken?.[0] === TokenType.Minus || this.nextToken?.[0] === TokenType.LCurly) {
      this.readToken()
      end = this.token?.[0] === TokenType.LCurly ? this.readArg() : this.readInteger()
    }
    return [NavigatorType.Slice, start, end, optional]
  }

  private readInteger(): number {
    if (this.token[0] === TokenType.Integer) return this.token[1]
    this.readToken()
    // @ts-ignore: ts(2637) shitty type assertion
    if (this.token[0] !== TokenType.Integer) throw new SyntaxError(this.unexpectedTokenMessage([TokenType.Integer]))
    return -this.token[1]
  }

  private assertTokenType(...types: TokenType[]) {
    if (!types.includes(this.token?.[0])) throw new SyntaxError(this.unexpectedTokenMessage(types))
  }

  private readToken() {
    this.token = this.nextToken
    this.nextToken = this.lexer.next().value
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
