export const enum TokenType {
  Dot = '.',
  LBracket = '[',
  RBracket = ']',
  SQuote = "'",
  DQuote = '"',
  EOF = '',
}

export interface Token {
  type: TokenType
  literal?: string
}
