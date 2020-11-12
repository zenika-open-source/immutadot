import Lexer from './lexer'
import { IndexNavigator, Navigator, NavigatorType, PropNavigator } from './path'
import { Token, TokenType } from './token'

export function parse(source: string): Navigator[] {
  return [...new Parser(source)]
}

class Parser implements IterableIterator<Navigator> {
  #l: Lexer

  constructor(source: string) {
    this.#l = new Lexer(source)
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
    const res = this.#l.next()
    return res.done ? undefined : res.value
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
