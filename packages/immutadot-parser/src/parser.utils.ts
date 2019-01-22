const mapIfNotNull = <T, R> (maybe: T | null, fn: (v: T) => R): R | null => maybe === null ? null : fn(maybe);

export type Parser<T> = (str: string) => T;

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
export const regexpToParser = (regexp: RegExp): Parser<string[] | null> => (str) => mapIfNotNull(
  str.match(regexp),
  (match) => match.slice(1),
);

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
  parser: Parser<T | null>,
  predicate: (result: T) => boolean,
): Parser<T | null> => (str) => mapIfNotNull(
  parser(str),
  (parsed) => predicate(parsed) ? parsed : null,
);

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
  parser: Parser<T | null>,
  mapper: (result: T) => R,
): Parser<R | null> => (str: string) => mapIfNotNull(
  parser(str),
  mapper,
);

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
const fallback = <T, F> (parser: Parser<T | null>, other: Parser<F>): Parser<T | F> => (str) => {
  const parsed = parser(str);
  if (parsed !== null) { return parsed; }
  return other(str);
};

/**
 * Returns a new parser that throws a TypeError if the given parser returns null.
 * 
 * @param parser the parser
 * @returns resulting parser
 *
 * @remarks
 * Since 2.0.0
 */
export const succeedOrThrow = <T> (parser: Parser<T | null>): Parser<T> => (str) => {
  const parsed = parser(str);
  if (parsed !== null) { return parsed; }
  throw new TypeError("parser failed");
};

/**
 * Chains a list of parsers together using <code>fallback</code>.
 *
 * @param parsers a list of parsers to try in order
 * @returns resulting parser
 *
 * @remarks
 * Since 1.0.0
 */
export const race = <T> (parsers: Array<Parser<T>>) => parsers.reduce(fallback);
