import { NavType } from "./enums";

import {
  filter,
  map,
  Parser,
  race,
  regexpToParser,
  succeedOrThrow,
} from "./parser.utils";

import {
  isIndex,
  isNil,
  isSliceIndexString,
  SliceIndex,
  toSliceIndex,
  toString,
} from "./utils";

type AllPropsSegment = [NavType.allProps];
const allPropsSegment = (): AllPropsSegment => [NavType.allProps];

type IndexSegment = [NavType.index, number];
const indexSegment = (index: number): IndexSegment => [NavType.index, index];

type PropListSegment = [NavType.list, string[]];
const propListSegment = (props: string[]): PropListSegment => [NavType.list, props];

type PropSegment = [NavType.prop, string];
const propSegment = (prop: string): PropSegment => [NavType.prop, prop];

type SliceSegment = [NavType.slice, [SliceIndex, SliceIndex]];
const sliceSegment = (start: SliceIndex, end: SliceIndex): SliceSegment => [NavType.slice, [start, end]];

type PathSegment = AllPropsSegment | IndexSegment | PropListSegment | PropSegment | SliceSegment;
type Path = PathSegment[];

/**
 * Strip slashes preceding occurences of <code>quote</code> from <code>str</code><br />
 * Possible quotes are <code>"</code> and <code>'</code>.
 *
 * @param str The string
 * @param quote The quote to unescape
 * @returns The unescaped string
 *
 * @remarks
 * Since 1.0.0
 */
const unescapeQuotes = (str: string, quote: "'" | '"') => str.replace(new RegExp(`\\\\${quote}`, "g"), quote);

const emptyStringParser: Parser<Path | null> = (str: string) => str.length === 0 ? [] : null;

const quotedBracketNotationParser: Parser<Path | null> = map(
  regexpToParser(/^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/),
  ([quote, property, rest]) => [propSegment(unescapeQuotes(property, quote as "'" | '"')), ...applyParsers(rest)],
);

const incompleteQuotedBracketNotationParser: Parser<Path | null> = map(
  regexpToParser(/^(\[["'][^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [propSegment(beforeNewSegment), ...applyParsers(rest)],
);

const bareBracketNotationParser: Parser<Path | null> = map(
  regexpToParser(/^\[([^\]]*)\]\.?(.*)$/),
  ([property, rest]) => {
    return isIndex(Number(property))
      ? [indexSegment(Number(property)), ...applyParsers(rest)]
      : [propSegment(property), ...applyParsers(rest)];
  },
);

const incompleteBareBracketNotationParser: Parser<Path | null> = map(
  regexpToParser(/^(\[[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [propSegment(beforeNewSegment), ...applyParsers(rest)],
);

const sliceNotationParser: Parser<Path | null> = map(
  filter(
    regexpToParser(/^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/),
    ([sliceStart, sliceEnd]) => isSliceIndexString(sliceStart) && isSliceIndexString(sliceEnd),
  ),
  ([sliceStart, sliceEnd, rest]) => [
    sliceSegment(toSliceIndex(sliceStart, 0), toSliceIndex(sliceEnd)),
    ...applyParsers(rest),
  ],
);

const listWildCardParser: Parser<Path | null> = map(
  regexpToParser(/^{\*}\.?(.*)$/),
  ([rest]) => [allPropsSegment(), ...applyParsers(rest)],
);

const listPropRegexp = /^,?((?!["'])([^,]*)|(["'])(.*?[^\\])\3)(.*)/;
function* extractListProps(rawProps: string) {
  if (rawProps.startsWith(",")) {  yield ""; }
  let remProps = rawProps;
  while (remProps !== "") {
    // Forcing exec return type as we are sure it matches
    const [, , bareProp, , quotedProp, rest] = listPropRegexp.exec(remProps) as RegExpExecArray;
    yield bareProp === undefined ? quotedProp : bareProp;
    remProps = rest;
  }
}

const listNotationParser: Parser<Path | null> = map(
  regexpToParser(/^\{(((?!["'])[^,}]*|(["']).*?[^\\]\2)(,((?!["'])[^,}]*|(["']).*?[^\\]\6))*)\}\.?(.*)$/),
  ([rawProps, , , , , , rest]) => {
    const props = [...extractListProps(rawProps)];
    return props.length === 1
      ? [propSegment(props[0]), ...applyParsers(rest)]
      : [propListSegment(props), ...applyParsers(rest)];
  },
);

const incompleteListNotationParser: Parser<Path | null> = map(
  regexpToParser(/^(\{[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [propSegment(beforeNewSegment), ...applyParsers(rest)],
);

const pathSegmentEndedByNewSegment: Parser<Path | null> = map(
  regexpToParser(/^([^.[{]*)\.?([[{]?.*)$/),
  ([beforeNewSegment, rest]) => [propSegment(beforeNewSegment), ...applyParsers(rest)],
);

const applyParsers: Parser<Path> = succeedOrThrow(race([
  emptyStringParser,
  quotedBracketNotationParser,
  incompleteQuotedBracketNotationParser,
  sliceNotationParser,
  bareBracketNotationParser,
  incompleteBareBracketNotationParser,
  listWildCardParser,
  listNotationParser,
  incompleteListNotationParser,
  pathSegmentEndedByNewSegment,
]));

const MAX_CACHE_SIZE = 1000;
const cache = new Map<string, Path>();

const stringToPath = (pStr: string): Path => {
  const str = pStr.startsWith(".") ? pStr.substring(1) : pStr;

  const path = applyParsers(str);

  return pStr.endsWith(".") ? [...path, propSegment("")] : path;
};

/**
 * Memoized version of {@link path.stringToPath}.<br />
 * The cache has a maximum size of 1000, when overflowing the cache is cleared.
 * @function
 * @param {string} str The string to convert
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
 * @memberof path
 * @private
 * @since 1.0.0
 */
const memoizedStringToPath = (str: string): Path => {
  if (cache.has(str)) {  return cache.get(str) as Path; }

  const path = stringToPath(str);

  if (cache.size === MAX_CACHE_SIZE) {  cache.clear(); }
  cache.set(str, path);

  return path;
};

/**
 * Converts <code>arg</code> to a path represented as an array of keys.<br />
 * <code>arg</code> may be a string, in which case it will be parsed.<br />
 * It may also be an Array, in which case a copy of the array with values converted to path keys will be returned.<br />
 * If <code>arg</code> is neither a string nor an Array, its string representation will be parsed.
 * @function
 * @param {string|Array|*} arg The value to convert
 * @returns {Array<Array<Symbol,*>>} The path represented as an array of keys
 * @memberof path
 * @since 1.0.0
 * @example toPath('a.b[1]["."][1:-1]') // => [[prop, 'a'], [prop, 'b'], [index, 1], [prop, '.'], [slice, [1, -1]]]
 * @private
 */
const toPath = (arg: string | undefined | null): Path  => {
  if (isNil(arg)) {  return []; }

  return memoizedStringToPath(toString(arg));
};

export { toPath };
