(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/fp/set', './consts'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/fp/set'), require('./consts'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.set, global.consts);
    global.set = mod.exports;
  }
})(this, function (exports, _set, _consts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _set2 = _interopRequireDefault(_set);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var set = _set2.default.convert(_consts.lodashFpConvertOptions);

  exports.default = set;
});