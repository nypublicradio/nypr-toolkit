(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['URLParse'],
      __esModule: true,
    };
  }

  define('url-parse', [], vendorModule);
})();
