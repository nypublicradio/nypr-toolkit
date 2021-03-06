import config from 'nypr-toolkit/config/environment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.urlPrefix = config.adminRoot;
  this.get('/api/v1/is_logged_in/', () => ({is_staff: true}));

  this.passthrough(config.themesIndex);
  this.passthrough(`${config.mailchimpProxy}/**`);
}

export function testConfig() {
  this.get('/api/v1/is_logged_in/', () => ({is_staff: false}));

  this.get(config.themesIndex, () => ([]));

  this.urlPrefix = config.mailchimpProxy;
  this.get('/lists', () => ({lists: []}));
}
