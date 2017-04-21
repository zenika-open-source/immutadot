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
  Object.keys(_set).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _set[key];
      }
    });
  });
  Object.keys(_unset).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _unset[key];
      }
    });
  });
  Object.keys(_update).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _update[key];
      }
    });
  });
});