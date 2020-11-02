import { allPropsSegment, indexSegment, propListSegment, propSegment, sliceSegment } from "./path"
import { toPath } from "./toPath"

describe("path.toPath", () => {
  it("should convert basic path", () => {
    expect(toPath("a.22.ccc")).toEqual([
      propSegment("a"),
      propSegment("22"),
      propSegment("ccc"),
    ])
    // Leading dot should be discarded
    expect(toPath(".a")).toEqual([
      propSegment("a"),
    ])
    // Empty properties should be kept
    expect(toPath(".")).toEqual([
      propSegment(""),
    ])
    expect(toPath("..prop")).toEqual([
      propSegment(""),
      propSegment("prop"),
    ])
    expect(toPath(".a.")).toEqual([
      propSegment("a"),
      propSegment(""),
    ])
    expect(toPath("..")).toEqual([
      propSegment(""),
      propSegment(""),
    ])
    // If no separators, path should be interpreted as one property
    expect(toPath('\']"\\')).toEqual([
      propSegment('\']"\\'),
    ])
  })
  it("should convert array notation path", () => {
    expect(toPath('[0][-2]["1.2"][\'[1.2]\']["[\\"1.2\\"]"][1a][1[2]')).toEqual([
      indexSegment(0),
      indexSegment(-2),
      propSegment("1.2"),
      propSegment("[1.2]"),
      propSegment('["1.2"]'),
      propSegment("1a"),
      propSegment("1[2"),
    ])
    // Empty unterminated array notation should be discarded
    expect(toPath("[0][")).toEqual([
      indexSegment(0),
      propSegment("["),
    ])
    expect(toPath('[0]["')).toEqual([
      indexSegment(0),
      propSegment('["'),
    ])
    // Unterminated array notation should run to end of path as string
    expect(toPath("[0][123")).toEqual([
      indexSegment(0),
      propSegment("[123"),
    ])
    expect(toPath("[0][1.a[2")).toEqual([
      indexSegment(0),
      propSegment("[1"),
      propSegment("a"),
      propSegment("[2"),
    ])
    // Unterminated quoted array notation should run to end of path
    expect(toPath('[0]["1[2].a')).toEqual([
      indexSegment(0),
      propSegment('["1'),
      indexSegment(2),
      propSegment("a"),
    ])
  })
  it("should convert slice notation path", () => {
    expect(toPath("[:][1:][0:-2][3:4][::666][1:2:3][4::-2]")).toEqual([
      sliceSegment(undefined, undefined, undefined),
      sliceSegment(1, undefined, undefined),
      sliceSegment(0, -2, undefined),
      sliceSegment(3, 4, undefined),
      sliceSegment(undefined, undefined, 666),
      sliceSegment(1, 2, 3),
      sliceSegment(4, undefined, -2),
    ])
    expect(toPath("[1:2:z][1:a][::0][1:2")).toEqual([
      propSegment("1:2:z"),
      propSegment("1:a"),
      propSegment("::0"),
      propSegment("[1:2"),
    ])
  })
  it("should convert list notation path", () => {
    expect(toPath("{abc,defg}.{123,4567,89}.{foo}")).toEqual([
      propListSegment([
          "abc",
          "defg",
        ]),
      propListSegment([
          "123",
          "4567",
          "89",
        ]),
      propSegment("foo"),
    ])
    expect(toPath('{"abc,defg",foo}.{\'123,4567,89\'}')).toEqual([
      propListSegment([
          "abc,defg",
          "foo",
        ]),
      propSegment("123,4567,89"),
    ])
    expect(toPath("{,1,2,3}")).toEqual([
      propListSegment([
          "",
          "1",
          "2",
          "3",
        ]),
    ])
    // Unterminated list notation should give a prop
    expect(toPath("abc.{")).toEqual([
      propSegment("abc"),
      propSegment("{"),
    ])
    expect(toPath('abc.{"')).toEqual([
      propSegment("abc"),
      propSegment('{"'),
    ])
    expect(toPath("abc.{a,b,c")).toEqual([
      propSegment("abc"),
      propSegment("{a,b,c"),
    ])
    expect(toPath("{abc,defg[0].foo{bar")).toEqual([
      propSegment("{abc,defg"),
      indexSegment(0),
      propSegment("foo"),
      propSegment("{bar"),
    ])
    // Unterminated quoted list notation should run to end of path
    expect(toPath('{abc,"defg[0]}.foo.{\'bar')).toEqual([
      propSegment('{abc,"defg'),
      indexSegment(0),
      propSegment("}"),
      propSegment("foo"),
      propSegment("{'bar"),
    ])
  })
  it("should convert list wildcard notation path", () => {
    expect(toPath("{*}")).toEqual([
      allPropsSegment(),
    ])
  })
  it("should convert mixed path", () => {
    expect(toPath('a[0]["b.c"].666[1:].{1a,2b,3c}')).toEqual([
      propSegment("a"),
      indexSegment(0),
      propSegment("b.c"),
      propSegment("666"),
      sliceSegment(1, undefined, undefined),
      propListSegment([
          "1a",
          "2b",
          "3c",
        ]),

    ])
    expect(toPath('a.[0].["b.c"]666[1:2:z]{1a}{"2b",\'3c\'}')).toEqual([
      propSegment("a"),
      indexSegment(0),
      propSegment("b.c"),
      propSegment("666"),
      propSegment("1:2:z"),
      propSegment("1a"),
      propListSegment([
        "2b",
        "3c",
      ]),
    ])
  })
  it("should give empty path for nil values", () => {
    expect(toPath(null)).toEqual([])
    expect(toPath(undefined)).toEqual([])
  })
})
