import { skip } from 'qunit';
import moduleForAcceptance from 'nypr-toolkit/tests/helpers/module-for-acceptance';
import config from 'nypr-toolkit/config/environment';
import pym from 'pym';
import sinon from 'sinon';

moduleForAcceptance('Auth', {
 beforeEach() {
   sinon.stub(pym, 'Parent').returns({
     onMessage: sinon.stub().callsArg(1),
     sendMessage() {}
   });
 },
 afterEach() {
   pym.Parent.restore();
   server.shutdown();
 }
});

skip('unauthorized access', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.ok(find('.auth-dialog').length, 'auth-dialog should render');
  });
});

skip('auth modal', function(assert) {
  server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
  visit('/');

  andThen(() => {
    assert.notOk(find('.auth-dialog').length, 'auth-dialog should not render for authenticated users');
  });
});

skip('can authenticate', function(assert) {
  assert.expect(3);
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
