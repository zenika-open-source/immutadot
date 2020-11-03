export const enum TokenType {
  Dot = '.',
  OptDot = '?.',
  LBracket = '[',
  RBracket = ']',
  Colon = ':',
  Identifier = 'identifier',
  Integer = 'integer',
  String = 'string',
  Illegal = 'illegal character',
}

export type Token = [TokenType, string?]
