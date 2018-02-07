import test from 'ember-sinon-qunit/test-support/test';
import moduleForAcceptance from 'nypr-toolkit/tests/helpers/module-for-acceptance';
import config from 'nypr-toolkit/config/environment';

moduleForAcceptance('Auth', {
  afterEach() {
    server.shutdown();
  }
});

test('unauthorized access', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.ok(find('.auth-dialog').length, 'auth-dialog should render');
  });
});

test('auth route', function(assert) {
  server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
  visit('/get-started');

  andThen(() => {
    assert.equal(currentURL(), '/get-started');
    assert.notOk(find('.auth-dialog').length, 'auth-dialog should not render for authenticated users');
  });
});

test('can authenticate', function(assert) {
  assert.expect(4);
  const USER = 'foo';
  const PW = 'bar';
  server.post(`${config.adminRoot}/api/v1/accounts/login/`, (schema, {requestBody}) => {
    let params = requestBody.split('&').map(qp => qp.split('=')).reduce((obj, [k, v]) => {
      obj[k] = v;
      return obj;
    }, {});
    assert.equal(params.username, USER, 'should send username');
    assert.equal(params.password, PW, 'should send password');
    return {success: true};
  });

  visit('/login');

  andThen(() => {
    fillIn('.auth-dialog__input[name=username]', USER);
    fillIn('.auth-dialog__input[name=password]', PW);
  })

  andThen(() => {
    server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
    click('.auth-dialog__submit');
  });

  andThen(() => {
    assert.equal(currentURL(), '/get-started');
    assert.notOk(find('.auth-dialog').length, 'auth-dialog should disappear after authenticating')
  });
});
