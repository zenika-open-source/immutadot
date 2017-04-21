(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['chai', './set'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('chai'), require('./set'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.chai, global.set);
    global.setSpec = mod.exports;
  }
})(this, function (_chai, _set) {
  'use strict';

  var _set2 = _interopRequireDefault(_set);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* eslint-env node, mocha */
  describe('Set', function () {

    it('should set a prop', function () {
      var nested = { prop: 'initial' };
      var input = { nested: nested };

      var output = (0, _set2.default)(input, 'nested.prop', 'final');

      (0, _chai.expect)(input).to.be.deep.equal({ nested: { prop: 'initial' } });
      (0, _chai.expect)(input.nested).to.be.equal(nested);
      (0, _chai.expect)(output).to.be.deep.equal({ nested: { prop: 'final' } });
    });
  });
});