export const enum TokenType {
  Dot = '.',
  LBracket = '[',
  RBracket = ']',
  SQuote = "'",
  DQuote = '"',
  Identifier = 'identifier',
  Integer = 'integer',
  Illegal = 'illegal character',
}

export type Token = [TokenType, string?]
