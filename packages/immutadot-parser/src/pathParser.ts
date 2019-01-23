import { Maybe } from "./maybe";
import { Parser } from "./parser";
import { Path, PathSegment } from "./path";
import { SliceIndex } from "./sliceIndex";
import { isIndex, unescapeQuotes } from "./utils";

const emptyStringParser: Parser<Maybe<Path>> = (str: string) => str.length === 0 ? [] : null;

const quotedBracketNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/),
  ([quote, property, rest]) => [Path.propSegment(unescapeQuotes(property, quote)), ...parseSegments(rest)],
);

const incompleteQuotedBracketNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^(\[["'][^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [Path.propSegment(beforeNewSegment), ...parseSegments(rest)],
);

const bareBracketNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^\[([^\]]*)\]\.?(.*)$/),
  ([property, rest]) => {
    return isIndex(Number(property))
      ? [Path.indexSegment(Number(property)), ...parseSegments(rest)]
      : [Path.propSegment(property), ...parseSegments(rest)];
  },
);

const incompleteBareBracketNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^(\[[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [Path.propSegment(beforeNewSegment), ...parseSegments(rest)],
);

const sliceNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.filter(
    Parser.fromRegExp(/^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/),
    ([sliceStart, sliceEnd]) => SliceIndex.isSliceIndexString(sliceStart) && SliceIndex.isSliceIndexString(sliceEnd),
  ),
  ([sliceStart, sliceEnd, rest]) => [
    Path.sliceSegment(SliceIndex.fromString(sliceStart, 0), SliceIndex.fromString(sliceEnd)),
    ...parseSegments(rest),
  ],
);

const listWildCardParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^{\*}\.?(.*)$/),
  ([rest]) => [Path.allPropsSegment(), ...parseSegments(rest)],
);

const listPropRegexp = /^,?((?!["'])([^,]*)|(["'])(.*?[^\\])\3)(.*)/;
function* extractListProps(rawProps: string) {
  if (rawProps.startsWith(",")) {  yield ""; }
  let remainingRawProps = rawProps;
  while (remainingRawProps !== "") {
    const [, , bareProp, , quotedProp, rest] = listPropRegexp.exec(remainingRawProps)!; // caller made sure it matches
    yield bareProp === undefined ? quotedProp : bareProp;
    remainingRawProps = rest;
  }
}

const listNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^\{(((?!["'])[^,}]*|(["']).*?[^\\]\2)(,((?!["'])[^,}]*|(["']).*?[^\\]\6))*)\}\.?(.*)$/),
  ([rawProps, , , , , , rest]) => {
    const props = [...extractListProps(rawProps)];
    return props.length === 1
      ? [Path.propSegment(props[0]), ...parseSegments(rest)]
      : [Path.propListSegment(props), ...parseSegments(rest)];
  },
);

const incompleteListNotationParser: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^(\{[^.[{]*)\.?(.*)$/),
  ([beforeNewSegment, rest]) => [Path.propSegment(beforeNewSegment), ...parseSegments(rest)],
);

const pathSegmentEndedByNewSegment: Parser<Maybe<Path>> = Parser.map(
  Parser.fromRegExp(/^([^.[{]*)\.?([[{]?.*)$/),
  ([beforeNewSegment, rest]) => [Path.propSegment(beforeNewSegment), ...parseSegments(rest)],
);

const parseSegments: Parser<PathSegment[]> =
  Parser.succeedOrThrow(
    Parser.race([
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
    ]),
  );

export const parse: Parser<Path> =
  Parser.ignorePrefix(
    Parser.andThen(
      parseSegments,
      (path, input) => input.endsWith(".") ? [...path, Path.propSegment("")] : path,
    ),
    ".",
  );

export const PathParser = {
  parse,
};
