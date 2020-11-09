import Lexer from './lexer'
import {
  IndexNavigator, Navigator, NavigatorType, PropNavigator,
} from './path'
import { TokenType } from './token'

export default class Parser implements IterableIterator<Navigator> {
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
    const token = this.readNextToken()

    if (token === undefined) throw SyntaxError('unexpected EOF')

    if (token[0] !== TokenType.Identifier) throw SyntaxError(`unexpected ${token[0]}`)

    return [NavigatorType.Prop, token[1]]
  }

  private readIndexNavigator(): IndexNavigator {
    let token = this.readNextToken()

    if (token === undefined) throw SyntaxError('unexpected EOF')

    if (token[0] !== TokenType.Integer) throw SyntaxError(`unexpected ${token[0]}`)

    const index = Number(token[1])

    token = this.readNextToken()

    if (token === undefined) throw SyntaxError('unexpected EOF')

    if (token[0] !== TokenType.RBracket) throw SyntaxError(`unexpected ${token[0]}`)

    return [NavigatorType.Index, index]
  }

  private readNextToken() {
    const res = this.#l.next()
    return res.done ? undefined : res.value
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
