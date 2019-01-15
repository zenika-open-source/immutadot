import { NavType } from "./enums";

const mapIfNotNull = <T, R> (maybe: (T | null), fn: (v: T) => R) => maybe === null ? null : fn(maybe);

type Parser = (str: string) => string[] | null;
// FIXME name these ?
export type Path = Array<
  [NavType.allProps] |
  [NavType.index, number] |
  [NavType.list, string[]] |
  [NavType.prop, string] |
  [NavType.slice, Array<number | undefined>]
>;
export type PathParser = (str: string) => Path | null;

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
export const regexpToParser = (regexp: RegExp): Parser => (str) => mapIfNotNull(
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
export const filter = (
  parser: Parser,
  predicate: (result: string[]) => boolean,
): Parser => (str) => mapIfNotNull(
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
export const map = (
  parser: Parser,
  mapper: (result: string[]) => Path,
): PathParser => (str: string) => mapIfNotNull(
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
const fallback = (parser: PathParser, other: PathParser): PathParser => (str) => {
  const parsed = parser(str);
  if (parsed !== null) { return parsed; }
  return other(str);
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
export const race = (parsers: PathParser[]) => {
  const racer = parsers.reduce(fallback);

  return (str: string): Path => {
    const path = racer(str);
    if (path === null) { throw TypeError(); }
    return path;
  };
};
