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

export interface Token {
  type: TokenType
  literal?: string
}
