(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './toggle'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./toggle'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toggle);
    global.index = mod.exports;
  }
})(this, function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggle = undefined;

  var _toggle2 = _interopRequireDefault(_toggle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.toggle = _toggle2.default;
});