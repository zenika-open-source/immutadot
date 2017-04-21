(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/fp/unset', './consts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/fp/unset'), require('./consts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.unset, global.consts);
    global.unset = mod.exports;
  }
})(this, function (exports, _unset, _consts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.unset = undefined;

  var _unset2 = _interopRequireDefault(_unset);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var unset = exports.unset = _unset2.default.convert(_consts.lodashFpConvertOptions);
});