import { Maybe } from "./maybe"

export type Parser<T> = (input: string) => T

/**
 * Creates a parser from a regular expression by matching the input string with
 * the regular expression, returning the resulting match object.
 *
 * @param regexp the regular expression
 * @returns the resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
export const fromRegExp = (regexp: RegExp): Parser<Maybe<string[]>> => (str) => Maybe.map(
  str.match(regexp),
  ([, ...groups]) => groups,
)

/**
 * Returns a new parser that will return <code>null</code> if a predicate about
 * the result of another parser does not hold. If the predicate holds then
 * the new parser returns the result of the other parser unchanged.
 *
 * @param parser parser to filter
 * @param predicate predicate to use
 * @returns resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
export const filter = <T> (
  parser: Parser<Maybe<T>>,
  predicate: (result: T) => boolean,
): Parser<Maybe<T>> => (str) => Maybe.map(
  parser(str),
  (parsed) => predicate(parsed) ? parsed : null,
)

/**
 * Returns a new parser which will post-process the result of another parser.
 *
 * @param parser parser for which to process the result
 * @param mapper function to transform the result of the parser
 * @returns resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
export const map = <T, R> (
  parser: Parser<Maybe<T>>,
  mapper: (result: T) => R,
): Parser<Maybe<R>> => (str: string) => Maybe.map(
  parser(str),
  mapper,
)

/**
 * Returns a new parser that attempts parsing with a first parser then falls
 * back to a second parser if the first returns <code>null</code>.
 *
 * @param parser the first parser
 * @param other the second parser
 * @returns resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
const fallback = <T, F> (parser: Parser<Maybe<T>>, other: Parser<F>): Parser<T | F> => (str) => {
  const parsed = parser(str)
  if (parsed !== null) { return parsed }
  return other(str)
}

/**
 * Returns a new parser that throws a TypeError if the given parser returns null.
 *
 * @param parser the parser
 * @returns resulting parser
 *
 * @remarks
 * Since 2.0.0
 */
export const succeedOrThrow = <T> (parser: Parser<Maybe<T>>): Parser<T> => (str) => {
  const parsed = parser(str)
  if (parsed === null) { throw new TypeError(`String could not be parsed: "${str}"`) }
  return parsed
}

/**
 * Chains a list of parsers together using <code>fallback</code>.
 *
 * @param parsers a list of parsers to try in order
 * @returns resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
export const race = <T> (parsers: Array<Parser<T>>) => parsers.reduce(fallback)

/**
 * Returns a new parser that strips the given prefix before applying the given parser.
 *
 * @param parser parser that will receive the input stripped from the prefix
 * @param prefix prefix to strip from the input
 * @returns resulting parser
 * @remarks
 * Since 2.0.0
 */
export const ignorePrefix = <T> (parser: Parser<T>, prefix: string): Parser<T> => (str) =>
  parser(str.startsWith(prefix) ? str.substring(prefix.length) : str)

/**
 * Returns a new parser that applies the given parser then transforms its output before returning it.
 *
 * @param parser parser which output will be transformed
 * @param fn transformation to apply on the output of parser
 * @returns resulting parser
 */
export const andThen = <T, R> (parser: Parser<T>, fn: (output: T, input: string) => R): Parser<R> => (str) =>
  fn(parser(str), str)

export const Parser = {
  andThen,
  fallback,
  filter,
  fromRegExp,
  ignorePrefix,
  map,
  race,
  succeedOrThrow,
}
