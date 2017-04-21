(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/fp/update', 'lodash/isFunction', './consts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/fp/update'), require('lodash/isFunction'), require('./consts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.update, global.isFunction, global.consts);
    global.update = mod.exports;
  }
})(this, function (exports, _update, _isFunction, _consts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _update2 = _interopRequireDefault(_update);

  var _isFunction2 = _interopRequireDefault(_isFunction);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var rawUpdate = _update2.default.convert(_consts.lodashFpConvertOptions);

  var updatePassingArgs = function updatePassingArgs(obj, path, fn) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    return rawUpdate(obj, path, function (v) {
      return fn.apply(undefined, [v].concat(args));
    });
  };

  var update = function update() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length === 1 && (0, _isFunction2.default)(args[0])) {
      return function (obj, path) {
        for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          rest[_key3 - 2] = arguments[_key3];
        }

        return updatePassingArgs.apply(undefined, [obj, path, args[0]].concat(rest));
      };
    }
    return updatePassingArgs.apply(undefined, args);
  };

  exports.default = update;
});