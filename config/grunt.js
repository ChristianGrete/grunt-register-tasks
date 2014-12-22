'use strict';

var
  _imports = {
      'GLOB': require('./_globs.json'),
      'PATH': require('./_paths.js')
    };

module.exports = require('../libs/extendConfig.js')(
    {},
    _imports
  );
