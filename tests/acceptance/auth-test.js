import test from 'ember-sinon-qunit/test-support/test';
import moduleForAcceptance from 'nypr-toolkit/tests/helpers/module-for-acceptance';
import config from 'nypr-toolkit/config/environment';

moduleForAcceptance('Auth');

test('unauthorized access', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.ok(find('.auth-dialog').length, 'auth-dialog should render');
  });
});

test('auth modal', function(assert) {
  server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
  visit('/');

  andThen(() => {
    assert.notOk(find('.auth-dialog').length, 'auth-dialog should not render for authenticated users');
  });
});

test('can authenticate', function(assert) {
  assert.expect(3);
  const USER = 'foo';
  const PW = 'bar';
  server.post(`${config.adminRoot}/api/v1/accounts/login/`, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    assert.equal(params.username, USER, 'should send username');
    assert.equal(params.password, PW, 'should send password');
    return {success: true};
  });

  visit('/');

  andThen(() => {
    fillIn('.auth-dialog__input[name=username]', USER);
    fillIn('.auth-dialog__input[name=password]', PW);
  })

  andThen(() => {
    server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
    click('.auth-dialog__submit');
  });

  andThen(() => assert.notOk(find('.auth-dialog').length, 'auth-dialog should disappear after authenticating'));
})
