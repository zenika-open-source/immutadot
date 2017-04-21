(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './core'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./core'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.core);
    global.index = mod.exports;
  }
})(this, function (exports, _core) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_core).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _core[key];
      }
    });
  });
});