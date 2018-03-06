(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.immutadot = {})));
}(this, (function (exports) { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _redefine = _hide;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _iterators = {};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$1 = _global.document;
var _html = document$1 && document$1.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from = _core.Array.from;

var from$1 = createCommonjsModule(function (module) {
module.exports = { "default": from, __esModule: true };
});

unwrapExports(from$1);

var toConsumableArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _from2 = _interopRequireDefault(from$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

var _getIterator = unwrapExports(getIterator$1);

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$1);

var ITERATOR$4 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$4] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};

var isIterable = core_isIterable;

var isIterable$1 = createCommonjsModule(function (module) {
module.exports = { "default": isIterable, __esModule: true };
});

unwrapExports(isIterable$1);

var slicedToArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _isIterable3 = _interopRequireDefault(isIterable$1);



var _getIterator3 = _interopRequireDefault(getIterator$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
});

var _slicedToArray = unwrapExports(slicedToArray);

var toArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _from2 = _interopRequireDefault(from$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return Array.isArray(arr) ? arr : (0, _from2.default)(arr);
};
});

var _toArray = unwrapExports(toArray);

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

var _extends = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _assign2 = _interopRequireDefault(assign$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var f$3 = _wks;

var _wksExt = {
	f: f$3
};

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$6
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;


















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !_isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

var _Symbol = unwrapExports(symbol$1);

var allProps = _Symbol('allProps');
var index = _Symbol('index');
var list = _Symbol('list');
var prop = _Symbol('prop');
var slice = _Symbol('slice');

// 20.1.2.3 Number.isInteger(number)

var floor$1 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
};

// 20.1.2.5 Number.isSafeInteger(number)


var abs = Math.abs;

_export(_export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

var isSafeInteger = _core.Number.isSafeInteger;

var isSafeInteger$1 = createCommonjsModule(function (module) {
module.exports = { "default": isSafeInteger, __esModule: true };
});

var _Number$isSafeInteger = unwrapExports(isSafeInteger$1);

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": iterator, __esModule: true };
});

unwrapExports(iterator$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _iterator2 = _interopRequireDefault(iterator$1);



var _symbol2 = _interopRequireDefault(symbol$1);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
});

unwrapExports(_typeof_1);

/**
 * Tests whether <code>arg</code> is a function.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a function, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
var isFunction = function isFunction(arg) {
  return typeof arg === 'function';
};

/**
 * Tests whether <code>arg</code> is a natural integer.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a natural integer, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
var isNaturalInteger = function isNaturalInteger(arg) {
  return _Number$isSafeInteger(arg) && arg >= 0;
};

/**
 * Tests whether <code>arg</code> is a <code>undefined</code> or <code>null</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is <code>undefined</code> or <code>null</code>, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
var isNil = function isNil(arg) {
  return arg === undefined || arg === null;
};

/**
 * Tests whether <code>arg</code> is a string.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a string, false otherwise
 * @memberof util
 * @private
 * @since 1.0.0
 */
var isString = function isString(arg) {
  return typeof arg === 'string';
};

/**
 * Returns the length of <code>arg</code>.
 * @function
 * @memberof util
 * @param {*} arg The value of which length must be returned
 * @returns {number} The length of <code>arg</code>
 * @private
 * @since 1.0.0
 */
var length = function length(arg) {
  if (isNil(arg) || !isNaturalInteger(arg.length)) return 0;
  return arg.length;
};

/**
 * Converts <code>arg</code> to a string using string interpolation.
 * @param {*} arg The value to convert
 * @return {string} The string representation of <code>arg</code>
 * @memberof util
 * @private
 * @since 1.0.0
 */
var toString$2 = function toString(arg) {
  return typeof arg === 'string' ? arg : '' + arg;
};

var getSliceBound = function getSliceBound(value, length$$1) {
  if (value < 0) return Math.max(length$$1 + value, 0);
  return value;
};

/**
 * Get the actual bounds of a slice.
 * @function
 * @memberof path
 * @param {Array<number>} bounds The bounds of the slice
 * @param {number} length The length of the actual array
 * @returns {Array<number>} The actual bounds of the slice
 * @private
 * @since 1.0.0
 */
var getSliceBounds = function getSliceBounds(_ref, length$$1) {
  var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];

  return [getSliceBound(start, length$$1), getSliceBound(end === undefined ? length$$1 : end, length$$1)];
};

/**
 * This is an alias for {@link util/isNaturalInteger}.
 * @function
 * @memberof path
 * @private
 * @since 1.0.0
 */
var isIndex = isNaturalInteger;

/**
 * Tests whether <code>arg</code> is a valid slice index, that is an integer or <code>undefined</code>.
 * @function
 * @param {*} arg The value to test
 * @return {boolean} True if <code>arg</code> is a valid slice index, false otherwise
 * @memberof path
 * @private
 * @since 1.0.0
 */
var isSliceIndex = function isSliceIndex(arg) {
  return arg === undefined || _Number$isSafeInteger(arg);
};

/**
 * Tests whether <code>path</code> has already been applied using a list of already applied paths.
 * @param {Array} path The path to test.
 * @param {Array} pAppliedPaths Already applied paths.
 * @returns {boolean} <code>true></code> if <code>path</code> has already been applied, <code>false</code> otherwise.
 * @memberof path
 * @private
 * @since 1.0.0
 */
function pathAlreadyApplied(path, pAppliedPaths) {
  if (pAppliedPaths === undefined) return false;
  var appliedPaths = pAppliedPaths.filter(function (appliedPath) {
    return !appliedPath.some(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          propType = _ref4[0];

      return propType === slice || propType === list;
    });
  });
  if (appliedPaths.length === 0) return false;
  if (path.length === 0 && appliedPaths.length !== 0) return true;
  return appliedPaths.some(function (appliedPath) {
    return pathIncludes(appliedPath, path);
  });
}

function pathIncludes(path, otherPath) {
  if (otherPath.length > path.length) return false;
  return otherPath.every(function (_ref5, i) {
    var _ref6 = _slicedToArray(_ref5, 2),
        otherProp = _ref6[1];

    var _path$i = _slicedToArray(path[i], 2),
        prop$$1 = _path$i[1];

    return prop$$1 === otherProp;
  });
}

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$2 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$2(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var dP$3 = _objectDp.f;
var each = _arrayMethods(0);


var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      _anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
        _anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP$3(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var _arrayFromIterable = function (iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function (NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function (COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/





var _setCollectionFrom = function (COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    _aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) _aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = _ctx(mapFn, arguments[2], 2);
      _forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      _forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var map = _core.Map;

var map$1 = createCommonjsModule(function (module) {
module.exports = { "default": map, __esModule: true };
});

var _Map = unwrapExports(map$1);

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

/**
 * @typedef {function(string): T | null} Parser<T>
 * @memberof path
 * @private
 * @since 1.0.0
 */

var maybeMap = function maybeMap(maybe, fn) {
  return maybe === null ? maybe : fn(maybe);
};

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
var regexp = function regexp(_regexp) {
  return function (str) {
    return maybeMap(str.match(_regexp), function (match) {
      return match.slice(1);
    });
  };
};

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
var filter = function filter(parser, predicate) {
  return function (str) {
    return maybeMap(parser(str), function (parsed) {
      return predicate(parsed) ? parsed : null;
    });
  };
};

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
var map$2 = function map(parser, mapper) {
  return function (str) {
    return maybeMap(parser(str), mapper);
  };
};

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
var fallback = function fallback(parser, other) {
  return function (str) {
    var parsed = parser(str);
    if (parsed !== null) return parsed;
    return other(str);
  };
};

/**
 * Chains a list of parsers together using <code>fallback</code>.
 * @function
 * @memberof path
 * @param {Array<core.Parser<*>>} parsers a list of parsers to try in order
 * @return {core.Parser<*>} resulting parser
 * @private
 * @since 1.0.0
 */
var race = function race(parsers) {
  return parsers.reduce(function (chainedParser, parser) {
    return fallback(chainedParser, parser);
  });
};

var _marked = /*#__PURE__*/regenerator.mark(extractListProps);

/**
 * Strip slashes preceding occurences of <code>quote</code> from <code>str</code><br />
 * Possible quotes are <code>"</code> and <code>'</code>.
 * @function
 * @param {string} str The string
 * @param {string} quote The quote to unescape
 * @returns {string} The unescaped string
 * @memberof path
 * @private
 * @since 1.0.0
 */
var unescapeQuotes = function unescapeQuotes(str, quote) {
  return str.replace(new RegExp('\\\\' + quote, 'g'), quote);
};

/**
 * Converts <code>str</code> to a slice index.
 * @function
 * @param {string} str The string to convert
 * @param {number?} defaultValue The default value if <code>str</code> is empty
 * @returns {number} <code>undefined</code> if <code>str</code> is empty, otherwise an int (may be NaN)
 * @memberof path
 * @private
 * @since 1.0.0
 */
var toSliceIndex = function toSliceIndex(str, defaultValue) {
  return str === '' ? defaultValue : Number(str);
};

/**
 * Tests whether <code>arg</code> is a valid slice index once converted to a number.
 * @function
 * @memberof path
 * @param {*} arg The value to test
 * @returns {boolean} True if <code>arg</code> is a valid slice index once converted to a number, false otherwise.
 * @private
 * @since 1.0.0
 */
var isSliceIndexString = function isSliceIndexString(arg) {
  return isSliceIndex(arg ? Number(arg) : undefined);
};

var emptyStringParser = function emptyStringParser(str) {
  return str.length === 0 ? [] : null;
};

var quotedBracketNotationParser = map$2(regexp(/^\[(['"])(.*?[^\\])\1\]?\.?(.*)$/), function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      quote = _ref2[0],
      property = _ref2[1],
      rest = _ref2[2];

  return [[prop, unescapeQuotes(property, quote)]].concat(_toConsumableArray(applyParsers(rest)));
});

var incompleteQuotedBracketNotationParser = map$2(regexp(/^(\[["'][^.[{]*)\.?(.*)$/), function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      beforeNewSegment = _ref4[0],
      rest = _ref4[1];

  return [[prop, beforeNewSegment]].concat(_toConsumableArray(applyParsers(rest)));
});

var bareBracketNotationParser = map$2(regexp(/^\[([^\]]*)\]\.?(.*)$/), function (_ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      property = _ref6[0],
      rest = _ref6[1];

  return isIndex(Number(property)) ? [[index, Number(property)]].concat(_toConsumableArray(applyParsers(rest))) : [[prop, property]].concat(_toConsumableArray(applyParsers(rest)));
});

var incompleteBareBracketNotationParser = map$2(regexp(/^(\[[^.[{]*)\.?(.*)$/), function (_ref7) {
  var _ref8 = _slicedToArray(_ref7, 2),
      beforeNewSegment = _ref8[0],
      rest = _ref8[1];

  return [[prop, beforeNewSegment]].concat(_toConsumableArray(applyParsers(rest)));
});

var sliceNotationParser = map$2(filter(regexp(/^\[([^:\]]*):([^:\]]*)\]\.?(.*)$/), function (_ref9) {
  var _ref10 = _slicedToArray(_ref9, 2),
      sliceStart = _ref10[0],
      sliceEnd = _ref10[1];

  return isSliceIndexString(sliceStart) && isSliceIndexString(sliceEnd);
}), function (_ref11) {
  var _ref12 = _slicedToArray(_ref11, 3),
      sliceStart = _ref12[0],
      sliceEnd = _ref12[1],
      rest = _ref12[2];

  return [[slice, [toSliceIndex(sliceStart, 0), toSliceIndex(sliceEnd)]]].concat(_toConsumableArray(applyParsers(rest)));
});

var listWildCardParser = map$2(regexp(/^{\*}\.?(.*)$/), function (_ref13) {
  var _ref14 = _slicedToArray(_ref13, 1),
      rest = _ref14[0];

  return [[allProps]].concat(_toConsumableArray(applyParsers(rest)));
});

var listPropRegexp = /^,?((?!["'])([^,]*)|(["'])(.*?[^\\])\3)(.*)/;
function extractListProps(rawProps) {
  var remProps, _listPropRegexp$exec, _listPropRegexp$exec2, bareProp, quotedProp, rest;

  return regenerator.wrap(function extractListProps$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!rawProps.startsWith(',')) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return '';

        case 3:
          remProps = rawProps;

        case 4:
          if (!(remProps !== '')) {
            _context.next = 11;
            break;
          }

          _listPropRegexp$exec = listPropRegexp.exec(remProps), _listPropRegexp$exec2 = _slicedToArray(_listPropRegexp$exec, 6), bareProp = _listPropRegexp$exec2[2], quotedProp = _listPropRegexp$exec2[4], rest = _listPropRegexp$exec2[5];
          _context.next = 8;
          return bareProp === undefined ? quotedProp : bareProp;

        case 8:
          remProps = rest;
          _context.next = 4;
          break;

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

var listNotationParser = map$2(regexp(/^\{(((?!["'])[^,}]*|(["']).*?[^\\]\2)(,((?!["'])[^,}]*|(["']).*?[^\\]\6))*)\}\.?(.*)$/), function (_ref15) {
  var _ref16 = _slicedToArray(_ref15, 7),
      rawProps = _ref16[0],
      rest = _ref16[6];

  var props = [].concat(_toConsumableArray(extractListProps(rawProps)));
  return props.length === 1 ? [[prop, props[0]]].concat(_toConsumableArray(applyParsers(rest))) : [[list, props]].concat(_toConsumableArray(applyParsers(rest)));
});

var incompleteListNotationParser = map$2(regexp(/^(\{[^.[{]*)\.?(.*)$/), function (_ref17) {
  var _ref18 = _slicedToArray(_ref17, 2),
      beforeNewSegment = _ref18[0],
      rest = _ref18[1];

  return [[prop, beforeNewSegment]].concat(_toConsumableArray(applyParsers(rest)));
});

var pathSegmentEndedByNewSegment = map$2(regexp(/^([^.[{]*)\.?([[{]?.*)$/), function (_ref19) {
  var _ref20 = _slicedToArray(_ref19, 2),
      beforeNewSegment = _ref20[0],
      rest = _ref20[1];

  return [[prop, beforeNewSegment]].concat(_toConsumableArray(applyParsers(rest)));
});

var applyParsers = race([emptyStringParser, quotedBracketNotationParser, incompleteQuotedBracketNotationParser, sliceNotationParser, bareBracketNotationParser, incompleteBareBracketNotationParser, listWildCardParser, listNotationParser, incompleteListNotationParser, pathSegmentEndedByNewSegment]);

var MAX_CACHE_SIZE = 1000;
var cache = new _Map();

var stringToPath = function stringToPath(pStr) {
  var str = pStr.startsWith('.') ? pStr.substring(1) : pStr;

  var path = applyParsers(str);

  return pStr.endsWith('.') ? [].concat(_toConsumableArray(path), [[prop, '']]) : path;
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
var memoizedStringToPath = function memoizedStringToPath(str) {
  if (cache.has(str)) return cache.get(str);

  var path = stringToPath(str);

  if (cache.size === MAX_CACHE_SIZE) cache.clear();
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
var toPath = function toPath(arg) {
  if (isNil(arg)) return [];

  return memoizedStringToPath(toString$2(arg));
};

/**
 * Makes a copy of value.
 * @function
 * @param {*} value The value to make a copy of
 * @param {boolean} asArray The value should be copied as an array
 * @returns {Object|Array} A copy of value
 * @memberof path
 * @private
 * @since 1.0.0
 */
var copy = function copy(value, asArray) {
  if (isNil(value)) {
    if (asArray) return [];
    return {};
  }
  if (Array.isArray(value)) return [].concat(_toConsumableArray(value));
  return _extends$1({}, value);
};

/**
 * Makes a copy of <code>value</code> if necessary.
 * @function
 * @param {*} value The value to make a copy of
 * @param {string} propType The type of the accessed property in <code>value</code>
 * @param {boolean} doCopy Whether to make a copy or not
 * @returns {Object|Array} A copy of value, or not ;)
 * @private
 * @since 1.0.0
 */
var copyIfNecessary = function copyIfNecessary(value, propType, doCopy) {
  if (!doCopy) return value;
  return copy(value, propType === index);
};

/**
 * Operation to apply on a nested property of an object, to be called by {@link core.apply|apply}.
 * @memberof path
 * @callback operation
 * @param {*} obj The last nested object
 * @param {string|number} prop The prop of the last nested object
 * @param {*} value The value of the prop
 * @param {...*} args The remaining args (passed to the {@link core.appliedOperation|appliedOperation})
 * @private
 * @since 1.0.0
 */

/**
 * A function able to apply an {@link core.operation|operation} on a nested property of an object, returned by {@link core.apply|apply}.
 * @memberof path
 * @callback appliedOperation
 * @param {*} obj The last nested object
 * @param {string} path The prop of the last nested object
 * @param {...*} args The remaining args (to be passed to the {@link core.operation|operation})
 * @returns {*} Result of the operation
 * @private
 * @since 1.0.0
 */

/**
 * Creates a function able to apply <code>operation</code> on a nested property.
 * @memberof path
 * @function
 * @param {core.operation} operation The operation to apply
 * @returns {core.appliedOperation} A function able to apply <code>operation</code>
 * @private
 * @since 1.0.0
 */
var apply = function apply(operation) {
  var curried = function curried(pPath) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var path = toPath(pPath);

    if (path.length === 0) throw new TypeError('path should not be empty');

    var applier = function applier(obj, appliedPaths) {
      var walkPath = function walkPath(curObj, curPath, remPath) {
        var isCopy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var _remPath = _toArray(remPath),
            curProp = _remPath[0],
            pathRest = _remPath.slice(1);

        var _curProp = _slicedToArray(curProp, 2),
            propType = _curProp[0],
            propValue = _curProp[1];

        if (propType === slice) {
          var _getSliceBounds = getSliceBounds(propValue, length(curObj)),
              _getSliceBounds2 = _slicedToArray(_getSliceBounds, 2),
              start = _getSliceBounds2[0],
              end = _getSliceBounds2[1];

          var newArr = copy(curObj, true);
          var _noop = true;

          for (var i = start; i < end; i++) {
            var _walkPath = walkPath(newArr, curPath, [[index, i]].concat(_toConsumableArray(pathRest)), true),
                _walkPath2 = _slicedToArray(_walkPath, 1),
                iNoop = _walkPath2[0];

            _noop = _noop && iNoop;
          }

          if (_noop) return [true, curObj];
          return [false, newArr];
        }

        if (propType === list || propType === allProps) {
          var _newObj = copy(curObj, false);
          var _noop2 = true;

          var listProps = propType === allProps ? _Object$keys(_newObj) : propValue;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _getIterator(listProps), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var listProp = _step.value;

              var _walkPath3 = walkPath(_newObj, curPath, [[prop, listProp]].concat(_toConsumableArray(pathRest)), true),
                  _walkPath4 = _slicedToArray(_walkPath3, 1),
                  _iNoop = _walkPath4[0];

              _noop2 = _noop2 && _iNoop;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (_noop2) return [true, curObj];
          return [false, _newObj];
        }

        var value = isNil(curObj) ? undefined : curObj[propValue];
        var doCopy = !isCopy && !pathAlreadyApplied(curPath, appliedPaths);

        if (remPath.length === 1) {
          var _newObj2 = copyIfNecessary(curObj, propType, doCopy);
          operation.apply(undefined, [_newObj2, propValue, value].concat(args));
          return [false, _newObj2];
        }

        var _walkPath5 = walkPath(value, [].concat(_toConsumableArray(curPath), [curProp]), pathRest),
            _walkPath6 = _slicedToArray(_walkPath5, 2),
            noop = _walkPath6[0],
            newValue = _walkPath6[1];

        if (noop) return [true, curObj];

        var newObj = copyIfNecessary(curObj, propType, doCopy);
        newObj[propValue] = newValue;
        return [false, newObj];
      };

      var _walkPath7 = walkPath(obj, [], path),
          _walkPath8 = _slicedToArray(_walkPath7, 2),
          result = _walkPath8[1];

      return result;
    };

    applier.path = path;

    var unaryApplier = function unaryApplier(arg) {
      return applier(arg);
    };
    unaryApplier.applier = applier;

    return unaryApplier;
  };

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var firstArg = args[0],
        argsRest = args.slice(1);

    if (isString(firstArg)) return curried.apply(undefined, args);
    return curried.apply(undefined, _toConsumableArray(argsRest))(firstArg);
  };
};

var makeOperation = function makeOperation(updater) {
  return function (obj, prop, value) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    obj[prop] = updater.apply(undefined, [value].concat(args));
  };
};

/**
 * Wraps an <code>updater</code> function, returning a new function taking <code>object</code>, <code>path</code> and <code>…args</code> as parameters.<br/>
 * The <code>updater</code> function is invoked with <code>value</code> and <code>…args</code>.<br/>
 * Be carefull, the <code>updater</code> function must not mutate its <code>value</code> argument.
 * @memberof core
 * @param {function} updater The updater function.
 * @return {function} Returns the wrapped function.
 * @example <caption>Wrapping an updater</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const incProp = convert(inc)
 * const object = { nested: { prop: 4 } }
 * incProp(object, 'nested.prop') // => { nested: { prop: 5 } }
 * incProp(object, 'nested.prop', 2) // => { nested: { prop: 6 } }
 * @see {@link core.update|update} for more information.
 * @since 1.0.0
 */
var convert = function convert(updater) {
  return apply(makeOperation(updater));
};

var toArray$1 = function toArray(array) {
  if (isNil(array)) return [];
  if (Array.isArray(array)) return array;
  return [array];
};

var toArrayCopy = function toArrayCopy(array) {
  if (isNil(array)) return [];
  if (Array.isArray(array)) return [].concat(_toConsumableArray(array));
  return [array];
};

var callMethodReturnResult = function callMethodReturnResult(array, method, args) {
  return array[method].apply(array, _toConsumableArray(args));
};

var callMethodReturnArray = function callMethodReturnArray(array, method, args) {
  array[method].apply(array, _toConsumableArray(args));
  return array;
};

/**
 * Converts an Array method.
 * @memberof array
 * @param {string} method Array method name.
 * @param {boolean} [mutating=true] Whether the method mutates the array.
 * @return {function} Returns the wrapped function.
 * @see {@link core.convert|convert} for more information.
 * @since 0.2.0
 * @private
 */
var convertArrayMethod = function convertArrayMethod(method) {
  var mutating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var getArray = mutating ? toArrayCopy : toArray$1;
  var callMethod = mutating ? callMethodReturnArray : callMethodReturnResult;
  return convert(function (value) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return callMethod(getArray(value), method, args);
  });
};

/**
 * Replaces by an array of elements <code>predicate</code> returns truthy for.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} predicate The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example filter({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', v => v % 2) // => { nested: { prop: [1, 3] } }
 * @see {@link https://mdn.io/Array.prototype.filter|Array.prototype.filter} for more information.
 * @since 1.0.0
 */
var filter$1 = convertArrayMethod('filter', false);

/**
 * Replaces an array concatenating the former array with additional arrays and/or values.<br/>
 * ⚠ Due to name conflicts, this function is named <code>arrayConcat</code> when imported from top level (<code>import { arrayConcat } from 'immutadot'</code>).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Array} arrays The arrays to concatenate.
 * @return {Object} Returns the updated object.
 * @example concat({ nested: { prop: [1, 2] } }, 'nested.prop', [3, 4]) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.concat|Array.prototype.concat} for more information.
 * @since 0.2.0
 */
var concat = convertArrayMethod('concat', false);

/**
 * Replaces by an array filled with value from start up to, but not including, end.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to fill array with.
 * @param {number} [start=0]
 * @param {number} [end=array.length]
 * @return {Object} Returns the updated object.
 * @example fill({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 6, 1, 3) // => { nested: { prop: [1, 6, 6, 4] } }
 * @see {@link https://mdn.io/Array.prototype.fill|Array.prototype.fill} for more information.
 * @since 0.3.0
 */
var fill = convertArrayMethod('fill');

/**
 * Replaces by an array of values by running each element in the former collection thru callback.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} callback The function invoked per iteration.
 * @return {Object} Returns the updated object.
 * @example map({ nested: { prop: [1, 2, 3] } }, 'nested.prop', v => v * 2) // => { nested: { prop: [2, 4, 6] } }
 * @see {@link https://mdn.io/Array.prototype.map|Array.prototype.map} for more information.
 * @since 1.0.0
 */
var map$3 = convertArrayMethod('map', false);

/**
 * Replaces by an array of elements with last element removed.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example pop({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop') // => { nested: { prop: [1, 2, 3] } }
 * @see {@link https://mdn.io/Array.prototype.pop|Array.prototype.pop} for more information.
 * @since 1.0.0
 */
var pop = convertArrayMethod('pop');

/**
 * Replaces an array adding one or more elements to the end of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example <caption>Add one element.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3) // => { nested: { prop: [1, 2, 3] } }
 * @example <caption>Add several elements.</caption>
 * push({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4) // => { nested: { prop: [1, 2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.push|Array.prototype.push} for more information.
 * @since 0.1.7
 */
var push = convertArrayMethod('push');

/**
 * Replaces an array reversing the elements from the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example reverse({ nested: { prop: [1, 2, 3] } }, 'nested.prop') // => { nested: { prop: [3, 2, 1] } }
 * @see {@link https://mdn.io/Array.prototype.reverse|Array.prototype.reverse} for more information..
 * @since 0.3.0
 */
var reverse = convertArrayMethod('reverse');

/**
 * Replaces by an array of elements with first element removed.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example shift({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop') // => { nested: { prop: [2, 3, 4] } }
 * @see {@link https://mdn.io/Array.prototype.shift|Array.prototype.shift} for more information.
 * @since 1.0.0
 */
var shift = convertArrayMethod('shift');

/**
 * Replaces an array by a slice of the former array from <code>start</code> up to, but not including, <code>end</code>.<br/>
 * ⚠ Due to name conflicts, this function is named <code>arraySlice</code> when imported from top level (<code>import { arraySlice } from 'immutadot'</code>).
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @return {Object} Returns the updated object.
 * @example slice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 3) // => { nested: { prop: [2, 3] } }
 * @see {@link https://mdn.io/Array.prototype.slice|Array.prototype.slice} for more information.
 * @since 0.3.0
 */
var slice$1 = convertArrayMethod('slice', false);

/**
 * Replaces an array removing and/or adding elements at <code>index</code> in the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} start Index at which to start changing the array.
 * @param {number} [deleteCount] The number of old array elements to remove.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example splice({ nested: { prop: [1, 2, 3, 4] } }, 'nested.prop', 1, 2, 5, 6) // => { nested: { prop: [1, 5, 6, 4] } }
 * @see {@link https://mdn.io/Array.prototype.splice|Array.prototype.splice} for more information.
 * @since 0.2.0
 */
var splice = convertArrayMethod('splice');

/**
 * Replaces by a sorted array, in natural order or according to the optional <code>comparator</code>.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function?} comparator The comparator function.
 * @return {Object} Returns the updated object.
 * @example sort({ nested: { prop: [2, 4, 3, 1] } }, 'nested.prop') // => { nested: { prop: [1, 2, 3, 4] } }
 * @example sort({ nested: { prop: [2, 4, 3, 1] } }, 'nested.prop', (a, b) => b - a) // => { nested: { prop: [4, 3, 2, 1] } }
 * @see {@link https://mdn.io/Array.prototype.sort|Array.prototype.sort} for more information.
 * @since 1.0.0
 */
var sort = convertArrayMethod('sort');

/**
 * Replaces an array adding elements at the start of the former array.
 * @function
 * @memberof array
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} values The values to add.
 * @return {Object} Returns the updated object.
 * @example <caption>Add one element.</caption>
 * unshift({ nested: { prop: [1, 2] } }, 'nested.prop', 3) // => { nested: { prop: [3, 1, 2] } }
 * @example <caption>Add several elements.</caption>
 * unshift({ nested: { prop: [1, 2] } }, 'nested.prop', 3, 4) // => { nested: { prop: [3, 4, 1, 2] } }
 * @see {@link https://mdn.io/Array.prototype.unshift|Array.prototype.unshift} for more information.
 * @since 0.1.7
 */
var unshift = convertArrayMethod('unshift');

/**
 * Array functions.
 * @namespace array
 * @since 0.1.6
 */

/**
 * Flattens an array.
 * @param {Array} arr The array to flatten.
 * @returns {Array} The flattened array.
 * @memberof util
 * @private
 * @since 1.0.0
 */
function flatten(arr) {
  return arr.reduce(function (flat, val) {
    return Array.isArray(val) ? flat.concat(val) : [].concat(_toConsumableArray(flat), [val]);
  }, []);
}

/**
 * A function successively calling a list of functions.
 * @callback flowFunction
 * @memberof core
 * @param {*} arg The starting value
 * @returns {*} The resulting value
 * @since 1.0.0
 */

/**
 * Creates a function that will successively call all functions contained in <code>args</code>.<br/>
 * Each function is called with the result of the previous one.<br/>
 * Non functions <code>args</code> are tolerated and will be ignored.
 * @memberof core
 * @param {...(function|Array<function>)} args The functions to apply
 * @returns {core.flowFunction} A function successively calling function <code>args</code>
 * @since 1.0.0
 */
function flow() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var fns = flatten(args).filter(function (fn) {
    return isFunction(fn);
  }).map(function (fn) {
    return fn.applier === undefined ? function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          obj = _ref2[0],
          appliedPaths = _ref2[1];

      return [fn(obj), appliedPaths];
    } : function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          obj = _ref4[0],
          appliedPaths = _ref4[1];

      return [fn.applier(obj, appliedPaths), [].concat(_toConsumableArray(appliedPaths), [fn.applier.path])];
    };
  });
  return function (obj) {
    var _fns$reduce = fns.reduce(function (acc, fn) {
      return fn(acc);
    }, [obj, []]),
        _fns$reduce2 = _slicedToArray(_fns$reduce, 1),
        result = _fns$reduce2[0];

    return result;
  };
}

/**
* Gets the value at <code>path</code> of <code>obj</code>.
* @memberof core
* @param {*} obj The object.
* @param {string|Array} path The path of the property to get.
* @param {*} defaultValue The default value.
* @return {*} Returns the value or <code>defaultValue</code>.
* @example get({ nested: { prop: 'val' } }, 'nested.prop') // => 'val'
* @example get({ nested: { prop: 'val' } }, 'nested.unknown', 'default') // => 'default'
* @since 1.0.0
 */
function get(obj, path, defaultValue) {
  function walkPath(curObj, remPath) {
    if (remPath.length === 0) return curObj === undefined ? defaultValue : curObj;
    if (isNil(curObj)) return defaultValue;

    var _remPath = _toArray(remPath),
        _remPath$ = _slicedToArray(_remPath[0], 2),
        prop$$1 = _remPath$[1],
        pathRest = _remPath.slice(1);

    return walkPath(curObj[prop$$1], pathRest);
  }
  var parsedPath = toPath(path);
  if (parsedPath.some(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        propType = _ref2[0];

    return propType !== prop && propType !== index;
  })) throw TypeError('get supports only properties and array indexes in path');
  return walkPath(obj, parsedPath);
}

var setOperation = function setOperation(obj, prop, _, value) {
  obj[prop] = value;
};

/**
 * Sets the value at <code>path</code> of <code>obj</code>.
 * @function
 * @memberof core
 * @param {*} obj The object to modify.
 * @param {string|Array} path The path of the property to set.
 * @param {*} value The value to set.
 * @return {*} Returns the updated object.
 * @example set({ nested: { prop: 'old' } }, 'nested.prop', 'new') // => { nested: { prop: 'new' } }
 * @since 1.0.0
 */
var set = apply(setOperation);

var unsetOperation = function unsetOperation(obj, prop) {
  delete obj[prop];
};

/**
 * Removes the property at <code>path</code> of <code>object</code>.
 * @function
 * @memberof core
 * @param {Object} obj The object to modify.
 * @param {Array|string} path The path of the property to unset.
 * @return {Object} Returns the updated object.
 * @example unset({ nested: { prop: 'value' } }, 'nested.prop') // => { nested: {} }
 * @since 1.0.0
 */
var unset = apply(unsetOperation);

var updateOperation = function updateOperation(obj, prop, value, updater) {
  for (var _len = arguments.length, args = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    args[_key - 4] = arguments[_key];
  }

  obj[prop] = updater.apply(undefined, [value].concat(args));
};

/**
 * Updates the value at <code>path</code> of <code>object</code> using the <code>updater</code> function.<br/>
 * The updater is invoked with <code>value</code> and <code>…args</code>.<br/>
 * Be carefull, the <code>updater</code> function must not mutate its <code>value</code> argument.
 * @function
 * @memberof core
 * @param {Object} obj The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {function} updater The function to produce the updated value.
 * @param {...*} args The remaining args.
 * @return {Object} Returns the updated object.
 * @example <caption>Updating a prop</caption>
 * const inc = (v, i = 1) => v + i // this function increments a number with an optional value which defaults to 1
 * const object = { nested: { prop: 4 } }
 * update(object, 'nested.prop', inc) // => { nested: { prop: 5 } }
 * update(object, 'nested.prop', inc, 2) // => { nested: { prop: 6 } }
 * @since 1.0.0
 */
var update = apply(updateOperation);

/**
* Core functions.
* @namespace core
* @since 1.0.0
*/

/**
 * Replaces by the addition of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} addend The number to add.
 * @return {Object} Returns the updated object.
 * @example add({ nested: { prop: 2 } }, 'nested.prop', 4) // => { nested: { prop: 6 } }
 * @since 1.0.0
 */
var add = convert(function (value, addition) {
  return Number(value) + Number(addition);
});

/**
 * Applies <code>&&</code> between the former value and <code>args</code>
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} [args] Other operands.
 * @return {Object} Returns the updated object.
 * @example and({ nested: { prop: true } }, 'nested.prop', true) // { nested: { prop: true } }
 * @example and({ nested: { prop: true } }, 'nested.prop', true, false) // { nested: { prop: false } }
 * @since 1.0.0
 */
var and = convert(function (v) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.reduce(function (acc, arg) {
    return acc && arg;
  }, v);
});

/**
 * Replaces by the division of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} divisor The second number in the division.
 * @return {Object} Returns the updated object.
 * @example divide({ nested: { prop: 1332 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @since 1.0.0
 */
var divide = convert(function (value, divider) {
  return Number(value) / Number(divider);
});

/**
 * Replaces by the multiplication of the former number and the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} multiplicand The second number in the multiplication.
 * @return {Object} Returns the updated object.
 * @example multiply({ nested: { prop: 333 } }, 'nested.prop', 2) // => { nested: { prop: 666 } }
 * @since 1.0.0
 */
var multiply = convert(function (value, multiplier) {
  return Number(value) * Number(multiplier);
});

/**
 * Applies <code>||</code> between the former value and <code>args</code>
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...*} [args] Other operands.
 * @return {Object} Returns the updated object.
 * @example or({ nested: { prop: false } }, 'nested.prop', true) // { nested: { prop: true } }
 * @example or({ nested: { prop: true } }, 'nested.prop', false, false) // { nested: { prop: true } }
 * @since 1.0.0
 */
var or = convert(function (v) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.reduce(function (acc, arg) {
    return acc || arg;
  }, v);
});

/**
 * Replaces by the subtraction of the former number by the given number.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} subtrahend The number to subtract.
 * @return {Object} Returns the updated object.
 * @example subtract({ nested: { prop: 2000 } }, 'nested.prop', 336) // => { nested: { prop: 1664 } }
 * @since 1.0.0
 */
var subtract = convert(function (value, subtraction) {
  return Number(value) - Number(subtraction);
});

/**
 * Applies <code>!</code> to the property.
 * @function
 * @memberof lang
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toggle({ nested: { prop: true } }, 'nested.prop') // { nested: { prop: false } }
 * @since 0.1.5
 */
var toggle = convert(function (v) {
  return !v;
});

/**
 * Lang functions.
 * @namespace lang
 * @since 0.1.5
 */

/**
 * Replaces by an object assigning own enumerable string keyed properties of source objects to the destination object.<br />
 * Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 * @function
 * @memberof object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...Object} [sources] The source objects.
 * @return {Object} Returns the updated object.
 * @example assign({ nested: { a: 1, b: 2 } }, 'nested', { b: 3, c: 4 }) // => { nested: { a:1, b: 3, c: 4 } }
 * @see {@link https://mdn.io/Object.prototype.assign|Object.prototype.assign} for more information.
 * @since 0.1.12
 */
var assign$2 = convert(function (obj) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return _Object$assign.apply(Object, [_extends$1({}, obj)].concat(args));
});

/**
 * Object functions.
 * @namespace object
 * @since 0.1.12
 */

function convertStringMethod(name) {
  return convert(function (arg) {
    var _toString;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_toString = toString$2(arg))[name].apply(_toString, args);
  });
}

/**
 * Replaces by former string concatenated with <code>strings</code>.<br/>
 * ⚠ Due to name conflicts, this function is named <code>stringConcat</code> when imported from top level (<code>import { stringConcat } from 'immutadot'</code>).
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {...string} strings Strings to concatenate.
 * @return {Object} Returns the updated object.
 * @example concat({ nested: { a: 'Hello' } }, 'nested.a', ' world', ' !') // => { nested: { a: 'Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.concat|String.prototype.concat} for more information.
 * @since 1.0.0
 */
var concat$1 = convertStringMethod('concat');

/**
 * Replaces by former string padded at the end with <code>padString</code> to the given <code>length</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} targetLength The length to pad to.
 * @param {string} [padString=' '] String to add.
 * @return {Object} Returns the updated object.
 * @example padEnd({ nested: { a: 'Hellow' } }, 10) // => { nested: { a: 'Hellow    ' } }
 * @example padEnd({ nested: { a: 'Hellow' } }, 10, '?!') // => { nested: { a: 'Hellow?!?!' } }
 * @see {@link https://mdn.io/String.prototype.padEnd|String.prototype.padEnd} for more information.
 * @since 1.0.0
 */
var padEnd = convertStringMethod('padEnd');

/**
 * Replaces by former string padded at the start with <code>padString</code> to the given <code>length</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} targetLength The length to pad to.
 * @param {string} [padString=' '] String to add.
 * @return {Object} Returns the updated object.
 * @example padStart({ nested: { a: 'Hellow' } }, 10) // => { nested: { a: '    Hellow' } }
 * @example padStart({ nested: { a: 'Hellow' } }, 10, '?!') // => { nested: { a: '?!?!Hellow' } }
 * @see {@link https://mdn.io/String.prototype.padStart|String.prototype.padStart} for more information.
 * @since 1.0.0
 */
var padStart = convertStringMethod('padStart');

/**
 * Replaces matches for pattern in string with replacement.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @return {Object} Returns the updated object.
 * @example replace({ nested: { a: 'Hi Nico' } }, 'nested.a', 'Nico', 'Yvo') // => { nested: { a: 'Hi Yvo' } }
 * @see {@link https://mdn.io/String.prototype.replace|String.prototype.replace} for more information.
 * @since 0.3.0
 */
var replace = convertStringMethod('replace');

/**
 * Replaces by a slice of former string starting at <code>beginIndex</code> and ending at <code>endIndex</code> or end of the string.<br/>
 * ⚠ Due to name conflicts, this function is named <code>stringSlice</code> when imported from top level (<code>import { stringSlice } from 'immutadot'</code>).
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} beginIndex Beginning index of slice.
 * @param {number?} endIndex Ending index of slice.
 * @return {Object} Returns the updated object.
 * @example slice({ nested: { a: 'Hello World !' } }, 6) // => { nested: { a: 'World !' } }
 * @example slice({ nested: { a: 'Hello World !' } }, 6, 11) // => { nested: { a: 'World' } }
 * @see {@link https://mdn.io/String.prototype.slice|String.prototype.slice} for more information.
 * @since 1.0.0
 */
var slice$2 = convertStringMethod('slice');

/**
 * Replaces by a slice of former string starting at <code>beginIndex</code>.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} beginIndex Beginning index of slice.
 * @param {number?} length Length of slice.
 * @return {Object} Returns the updated object.
 * @example substr({ nested: { a: 'Hello World !' } }, 6) // => { nested: { a: 'World !' } }
 * @example substr({ nested: { a: 'Hello World !' } }, 6, 5) // => { nested: { a: 'World' } }
 * @see {@link https://mdn.io/String.prototype.substr|String.prototype.substr} for more information.
 * @since 1.0.0
 */
var substr = convertStringMethod('substr');

/**
 * Replaces by a slice of former string starting at <code>beginIndex</code> and ending at <code>endIndex</code> or end of the string.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {number} beginIndex Beginning index of slice.
 * @param {number?} endIndex Ending index of slice.
 * @return {Object} Returns the updated object.
 * @example substring({ nested: { a: 'Hello World !' } }, 6) // => { nested: { a: 'World !' } }
 * @example substring({ nested: { a: 'Hello World !' } }, 6, 11) // => { nested: { a: 'World' } }
 * @see {@link https://mdn.io/String.prototype.substring|String.prototype.substring} for more information.
 * @since 1.0.0
 */
var substring = convertStringMethod('substring');

/**
 * Replaces by former string in lower case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {string?} locale Locale.
 * @return {Object} Returns the updated object.
 * @example toLocaleLowerCase({ nested: { a: 'ÇA vA Bien ?' } }, 'fr_fr') // => { nested: { a: 'ça va bien ?' } }
 * @see {@link https://mdn.io/String.prototype.toLocaleLowerCase|String.prototype.toLocaleLowerCase} for more information.
 * @since 1.0.0
 */
var toLocaleLowerCase = convertStringMethod('toLocaleLowerCase');

/**
 * Replaces by former string in upper case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {string?} locale Locale.
 * @return {Object} Returns the updated object.
 * @example toLocaleUpperCase({ nested: { a: 'çA vA Bien ?' } }, 'fr_fr') // => { nested: { a: 'ÇA VA BIEN ?' } }
 * @see {@link https://mdn.io/String.prototype.toLocaleUpperCase|String.prototype.toLocaleUpperCase} for more information.
 * @since 1.0.0
 */
var toLocaleUpperCase = convertStringMethod('toLocaleUpperCase');

/**
 * Replaces by former string in lower case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toLowerCase({ nested: { a: 'Hello WORLD !' } }, 'fr_fr') // => { nested: { a: 'hello world !' } }
 * @see {@link https://mdn.io/String.prototype.toLowerCase|String.prototype.toLowerCase} for more information.
 * @since 1.0.0
 */
var toLowerCase = convertStringMethod('toLowerCase');

/**
 * Replaces by former string in upper case.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example toUpperCase({ nested: { a: 'Hello world !' } }, 'fr_fr') // => { nested: { a: 'HELLO WORLD !' } }
 * @see {@link https://mdn.io/String.prototype.toUpperCase|String.prototype.toUpperCase} for more information.
 * @since 1.0.0
 */
var toUpperCase = convertStringMethod('toUpperCase');

/**
 * Replaces by former string stripped of whitespaces at start and end.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trim({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: 'Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.trim|String.prototype.trim} for more information.
 * @since 1.0.0
 */
var trim = convertStringMethod('trim');

/**
 * Replaces by former string stripped of whitespaces at start.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimLeft({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: 'Hello world !   ' } }
 * @see {@link https://mdn.io/String.prototype.trimLeft|String.prototype.trimLeft} for more information.
 * @since 1.0.0
 */
var trimLeft = convertStringMethod('trimLeft');

/**
 * Replaces by former string stripped of whitespaces at end.
 * @function
 * @memberof string
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @return {Object} Returns the updated object.
 * @example trimRight({ nested: { a: '   Hello world !   ' } }) // => { nested: { a: '   Hello world !' } }
 * @see {@link https://mdn.io/String.prototype.trimRight|String.prototype.trimRight} for more information.
 * @since 1.0.0
 */
var trimRight = convertStringMethod('trimRight');

/**
 * String functions.
 * @namespace string
 * @since 0.3.0
 */

exports.arrayConcat = concat;
exports.fill = fill;
exports.filter = filter$1;
exports.map = map$3;
exports.pop = pop;
exports.push = push;
exports.reverse = reverse;
exports.shift = shift;
exports.arraySlice = slice$1;
exports.sort = sort;
exports.splice = splice;
exports.unshift = unshift;
exports.stringConcat = concat$1;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.replace = replace;
exports.stringSlice = slice$2;
exports.substr = substr;
exports.substring = substring;
exports.toLocaleLowerCase = toLocaleLowerCase;
exports.toLocaleUpperCase = toLocaleUpperCase;
exports.toLowerCase = toLowerCase;
exports.toUpperCase = toUpperCase;
exports.trim = trim;
exports.trimLeft = trimLeft;
exports.trimRight = trimRight;
exports.convert = convert;
exports.flow = flow;
exports.get = get;
exports.set = set;
exports.unset = unset;
exports.update = update;
exports.add = add;
exports.and = and;
exports.divide = divide;
exports.multiply = multiply;
exports.or = or;
exports.subtract = subtract;
exports.toggle = toggle;
exports.assign = assign$2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
