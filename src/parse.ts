import Lexer from './lexer'
import { IndexNavigator, Navigator, NavigatorType, PropNavigator } from './path'
import { Token, TokenType } from './token'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        navigator = this.readIndexNavigator()
        break
      default: throw SyntaxError(`unexpected ${token[0]}`)
    }

    return { value: navigator }
  }

  private readPropNavigator(): PropNavigator {
    return [NavigatorType.Prop, this.readNextTokenType(TokenType.Identifier)]
  }

  private readIndexNavigator(): IndexNavigator {
    const index = Number(this.readNextTokenType(TokenType.Integer))
    this.readNextTokenType(TokenType.RBracket)
    return [NavigatorType.Index, index]
  }

  private readNextTokenType(type: TokenType): string {
    const token = this.readNextToken()
    if (token === undefined) throw SyntaxError(`unexpected EOF expected ${type}`)
    if (token[0] !== type) throw SyntaxError(`unexpected ${token[0]} expected ${type}`)
    return token[1]
  }

  private readNextToken(): Token {
    if (this.#l === undefined) this.#l = new Lexer(this.#chunks[this.#chunkIndex])
    const res = this.#l.next()
    if (res.done) {
      if (this.#chunkIndex === this.#args.length) return undefined
      return this.readNextArgToken()
    }
    return res.value
  }

  private readNextArgToken(): Token {
    throw new Error('Method not implemented.')
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
