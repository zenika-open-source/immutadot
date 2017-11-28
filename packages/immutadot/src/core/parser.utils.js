/**
 * @typedef {function(string): T | null} Parser<T>
 */

const maybeMap = (maybe, fn) => maybe === null ? maybe : fn(maybe)

/**
 * Creates a parser from a regular expression by matching the input string with
 * the regular expression, returning the resulting match object.
 * @function
 * @param {RegExp} regexp the regular expression
 * @return {Parser<string[]>} the resulting parser
 */
export const regexp = regexp => str => maybeMap(str.match(regexp), match => match.slice(1))

/**
 * Returns a new parser that will return <code>null</code> if a predicate about
 * the result of another parser does not hold. If the predicate holds then
 * the new parser returns the result of the other parser unchanged.
 * @function
 * @param {Parser<T>} parser parser to filter
 * @param {function(*): boolean} predicate predicate to use
 * @return {Parser<T>} resulting parser
 */
export const filter = (parser, predicate) => str => maybeMap(parser(str), parsed => predicate(parsed) ? parsed : null)

/**
 * Returns a new parser which will post-process the result of another parser.
 * @function
 * @param {Parser<T>} parser parser for which to process the result
 * @param {function(T): R} mapper function to transform the result of the parser
 * @return {Parser<R>} resulting parser
 */
export const map = (parser, mapper) => str => maybeMap(parser(str), mapper)

/**
 * Returns a new parser that attempts parsing with a first parser then falls
 * back to a second parser if the first returns <code>null</code>.
 * @function
 * @param {Parser<A>} parser the first parser
 * @param {Parser<B>} other the second parser
 * @return {Parser<A | B>} resulting parser
 */
export const fallback = (parser, other) => str => {
  const parsed = parser(str)
  if (parsed !== null) return parsed
  return other(str)
}

/**
 * Chains a list of parsers together using <code>fallback</code>.
 * @function
 * @param {Array<Parser<*>>} parsers a list of parsers to try in order
 * @return {Parser<*>} resulting parser
 */
export const race = parsers => parsers.reduce((chainedParser, parser) => fallback(chainedParser, parser))
