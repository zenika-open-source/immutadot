(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['chai', './unset'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('chai'), require('./unset'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.chai, global.unset);
    global.unsetSpec = mod.exports;
  }
})(this, function (_chai, _unset) {
  'use strict';

  var _unset2 = _interopRequireDefault(_unset);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* eslint-env node, mocha */
  describe('Unset', function () {

    it('should unset a prop', function () {
      var nested = { prop: 'initial' };
      var input = { nested: nested };

      var output = (0, _unset2.default)(input, 'nested.prop');

      (0, _chai.expect)(input).to.be.deep.equal({ nested: { prop: 'initial' } });
      (0, _chai.expect)(input.nested).to.be.equal(nested);
      (0, _chai.expect)(output).to.be.deep.equal({ nested: {} });
    });
  });
});