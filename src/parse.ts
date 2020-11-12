import Lexer from './lexer'
import { Navigator, NavigatorType, PropNavigator } from './path'
import { Token, TokenType } from './token'

export function parse(chunks: readonly string[], args: any[]): Navigator[] {
  return [...new Parser(chunks, args)]
}

class Parser implements IterableIterator<Navigator> {
  #chunks: readonly string[]

  #args: any[]

  #chunkIndex = 0

  #l: Lexer

  constructor(chunks: readonly string[], args: any[]) {
    this.#chunks = chunks
    this.#args = args
    this.nextLexer()
  }

  next(): IteratorResult<Navigator> {
    const token = this.readNextToken()

    if (token === undefined) return { done: true, value: null }

    let navigator: Navigator

    switch (token[0]) {
      case TokenType.Dot:
        navigator = this.readPropNavigator()
        break
      case TokenType.LBracket:
        navigator = this.readBracketNavigator()
        break
      default: throw SyntaxError(`unexpected ${token[0]}`)
    }

    return { value: navigator }
  }

  private readPropNavigator(): PropNavigator {
    return [NavigatorType.Prop, this.readNextTokenType(TokenType.Identifier)]
  }

  private readBracketNavigator(): Navigator {
    const token = this.readNextToken()
    if (token === undefined) throw SyntaxError('unexpected EOF, expected integer or string')
    let navigator: Navigator
    switch (token[0]) {
      case TokenType.Integer:
        navigator = [NavigatorType.Index, token[1]]
        break
      case TokenType.String:
        navigator = [NavigatorType.Prop, token[1]]
        break
      default: throw SyntaxError(`unexpected ${token[0]} expected integer or string`)
    }
    this.readNextTokenType(TokenType.RBracket)
    return navigator
  }

  private readNextTokenType(type: TokenType): any {
    const token = this.readNextToken()
    if (token === undefined) throw SyntaxError(`unexpected EOF expected ${type}`)
    if (token[0] !== type) throw SyntaxError(`unexpected ${token[0]} expected ${type}`)
    return token[1]
  }

  private readNextToken(): Token {
    if (this.#l === undefined) return undefined
    const res = this.#l.next()
    if (!res.done) return res.value
    if (this.#chunkIndex === this.#args.length) {
      this.#l = undefined
      return undefined
    }
    const token = this.readNextArgToken()
    this.#chunkIndex++
    this.nextLexer()
    return token
  }

  private readNextArgToken(): Token {
    const arg = this.#args[this.#chunkIndex]
    switch (typeof arg) {
      case 'number': return [TokenType.Integer, arg]
      case 'string': return [TokenType.String, arg]
      default: throw TypeError(`unexpected argument ${arg}`)
    }
  }

  private nextLexer() {
    this.#l = new Lexer(this.#chunks[this.#chunkIndex])
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
