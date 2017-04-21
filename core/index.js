(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './set', './unset', './update'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./set'), require('./unset'), require('./update'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.set, global.unset, global.update);
    global.index = mod.exports;
  }
})(this, function (exports, _set, _unset, _update) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.update = exports.unset = exports.set = undefined;

  var _set2 = _interopRequireDefault(_set);

  var _unset2 = _interopRequireDefault(_unset);

  var _update2 = _interopRequireDefault(_update);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.set = _set2.default;
  exports.unset = _unset2.default;
  exports.update = _update2.default;
});