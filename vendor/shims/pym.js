(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['pym'],
      __esModule: true,
    };
  }

  define('pym', [], vendorModule);
})();
