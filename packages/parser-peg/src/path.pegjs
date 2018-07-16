{
  const types = {
    allProps: 'allProps',
    index: 'index',
    prop: 'prop',
    props: 'props',
    slice: 'slice',
  }

  const allProps = [types.allProps]
  const emptyProp = [types.prop, '']

  function toSign(sign) {
    return sign === '-' ? -1 : 1
  }

  function toNumber(value) {
    const n = Number(value)
    return Number.isNaN(n) ? s : n
  }
}

Path      = Step*

Step      = AllProps
          / DotProp
          / Brackets
          / DotEmptyProp

AllProps  = Dot? "{*}" { return allProps }

DotProp   = Dot? value:Prop { return value }

Prop      = name:[^.[]+ { return [types.prop, name.join('') ] }

Brackets = Dot? "[" value:BracketsContent "]" { return value }

BracketsContent = Slice
                / Index

Slice = start:Number? ":" end:Number? step:SliceStep? { return [types.slice, [start, end, step]] }

SliceStep = ":" value:Number? { return value }

Index = value:Number { return [types.index, value] }

Number = sign:"-"? value:( HexadecimalNumber / BinaryNumber / OctalNumber / DecimalNumber ) { return toSign(sign) * toNumber(value) }

HexadecimalNumber = prefix:"0x"i value:[0-9a-f]i+ { return prefix.concat(value.join('')) }
BinaryNumber = prefix:"0b"i value:[01]+ { return prefix.concat(value.join('')) }
OctalNumber = prefix:"0o"i value:[0-7]+ { return prefix.concat(value.join('')) }
DecimalNumber = value:[0-9]+ { return value.join('') }

DotEmptyProp = Dot value:EmptyProp { return value }

EmptyProp = "" { return emptyProp }

Dot       = "."
