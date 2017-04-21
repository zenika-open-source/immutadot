(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../core/update'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../core/update'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.update);
    global.toggle = mod.exports;
  }
})(this, function (exports, _update) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _update2 = _interopRequireDefault(_update);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var toggle = (0, _update2.default)(function (v) {
    return !v;
  });

  exports.default = toggle;
});