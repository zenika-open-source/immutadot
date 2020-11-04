import Lexer from './lexer'
import { Navigator, NavigatorType, PropNavigator } from './path'
import { TokenType } from './token'

export default class Parser implements IterableIterator<Navigator> {
  #l: Lexer

  constructor(source: string) {
    this.#l = new Lexer(source)
  }

  next(): IteratorResult<Navigator> {
    const firstTokenResult = this.#l.next()

    if (firstTokenResult.done) return { done: true, value: null }

    if (firstTokenResult.value[0] !== TokenType.Dot) throw SyntaxError(`unexpected ${firstTokenResult.value[0]}`)

    const secondTokenResult = this.#l.next()

    if (secondTokenResult.done) throw SyntaxError('unexpected EOF')

    if (secondTokenResult.value[0] !== TokenType.Identifier) throw SyntaxError(`unexpected ${secondTokenResult.value[0]}`)

    return { value: [NavigatorType.Prop, secondTokenResult.value[1]] }
  }

  [Symbol.iterator](): IterableIterator<Navigator> {
    return this
  }
}
