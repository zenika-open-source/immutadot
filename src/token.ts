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
  Symbol = 'symbol',
  Illegal = 'illegal',
}

export type Token = (
  [TokenType.Dot, undefined, number] |
  [TokenType.OptDot, undefined, number] |
  [TokenType.LBracket, undefined, number] |
  [TokenType.RBracket, undefined, number] |
  [TokenType.Colon, undefined, number] |
  [TokenType.Minus, undefined, number] |
  [TokenType.Identifier, string, number] |
  [TokenType.Integer, number, number] |
  [TokenType.String, string, number] |
  [TokenType.Symbol, symbol, number] |
  [TokenType.Illegal, any, number, string?]
)
