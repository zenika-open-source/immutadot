/**
 * @typedef {function(string): T | null} Parser<T>
 * @memberof path
 * @private
 * @since 1.0.0
 */

const maybeMap = (maybe, fn) => maybe === null ? maybe : fn(maybe)

/**
 * Creates a parser from a regular expression by matching the input string with
 * the regular expression, returning the resulting match object.
 * @function
 * @memberof path
 * @param {RegExp} regexp the regular expression
 * @return {core.Parser<string[]>} the resulting parser
 * @private
 * @since 1.0.0
 */
export const regexp = regexp => str => maybeMap(str.match(regexp), match => match.slice(1))

/**
 * Returns a new parser that will return <code>null</code> if a predicate about
 * the result of another parser does not hold. If the predicate holds then
 * the new parser returns the result of the other parser unchanged.
 * @function
 * @memberof path
 * @param {core.Parser<T>} parser parser to filter
 * @param {function(*): boolean} predicate predicate to use
 * @return {core.Parser<T>} resulting parser
 * @private
 * @since 1.0.0
 */
export const filter = (parser, predicate) => str => maybeMap(parser(str), parsed => predicate(parsed) ? parsed : null)

/**
 * Returns a new parser which will post-process the result of another parser.
 * @function
 * @memberof path
 * @param {core.Parser<T>} parser parser for which to process the result
 * @param {function(T): R} mapper function to transform the result of the parser
 * @return {core.Parser<R>} resulting parser
 * @private
 * @since 1.0.0
 */
export const map = (parser, mapper) => str => maybeMap(parser(str), mapper)

/**
 * Returns a new parser that attempts parsing with a first parser then falls
 * back to a second parser if the first returns <code>null</code>.
 * @function
 * @memberof path
 * @param {core.Parser<A>} parser the first parser
 * @param {core.Parser<B>} other the second parser
 * @return {core.Parser<A | B>} resulting parser
 * @private
 * @since 1.0.0
 */
export const fallback = (parser, other) => str => {
  const parsed = parser(str)
  if (parsed !== null) return parsed
  return other(str)
}

/**
 * Chains a list of parsers together using <code>fallback</code>.
 * @function
 * @memberof path
 * @param {Array<core.Parser<*>>} parsers a list of parsers to try in order
 * @return {core.Parser<*>} resulting parser
 * @private
 * @since 1.0.0
 */
export const race = parsers => parsers.reduce((chainedParser, parser) => fallback(chainedParser, parser))
