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

export type Token = (
  [TokenType.Dot] |
  [TokenType.OptDot] |
  [TokenType.LBracket] |
  [TokenType.RBracket] |
  [TokenType.Colon] |
  [TokenType.Minus] |
  [TokenType.Identifier, string] |
  [TokenType.Integer, number] |
  [TokenType.String, string] |
  [TokenType.Illegal, any]
)
