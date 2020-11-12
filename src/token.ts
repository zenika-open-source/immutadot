export const enum TokenType {
  Dot = '.',
  OptDot = '?.',
  LBracket = '[',
  RBracket = ']',
  Colon = ':',
  Minus = '-',
  Identifier = 'identifier',
  Integer = 'integer',
  String = 'string',
  Illegal = 'illegal',
}

export type Token = [TokenType, any?]
