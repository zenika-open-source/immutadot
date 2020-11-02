import { Token, TokenType } from './token'

export default class Lexer implements IterableIterator<Token> {
  #source: string

  constructor(source: string) {
    this.#source = source
  }

  next(): IteratorResult<Token> {
    return { value: null, done: true }
  }

  [Symbol.iterator](): IterableIterator<Token> {
    return this
  }
}
