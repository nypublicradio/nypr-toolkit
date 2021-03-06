'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'nypr-toolkit',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    embeds: {
      callToAction: process.env.CALL_TO_ACTION,
      newsletterSignup: process.env.NEWSLETTER_SIGNUP,
      playlist: process.env.PLAYLIST
    },
    themesIndex: process.env.THEMES,
    adminRoot: process.env.ADMIN_ROOT,
    mailchimpProxy: process.env.MAILCHIMP_PROXY,
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.APP.autoboot = false;
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.adminRoot = 'http://example.com/admin';
    ENV.mailchimpProxy = 'http://example.com/mailchimp';
    ENV.themesIndex = 'http://example.com/themes';

    ENV.embeds = {
      callToAction: '/call-to-action',
      newsletterSignup: '/newsletter',
      playlist: '/playlist'
    };
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.rootURL = '/toolkit/';
  }

  return ENV;
};
