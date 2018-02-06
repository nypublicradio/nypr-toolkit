import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, click } from 'ember-native-dom-helpers';

moduleForComponent('auth-dialog', 'Integration | Component | auth dialog', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{auth-dialog}}`);
  assert.ok(find('.auth-dialog'), 'dialog renders');
});

test('it has a login and password field', function(assert) {
  this.render(hbs`{{auth-dialog}}`);

  assert.ok(find('.auth-dialog__input[name=username]'), 'username field renders');
  assert.ok(find('.auth-dialog__input[name=password]'), 'password field renders');
  assert.ok(find('.auth-dialog__submit'), 'submit button renders');
});

test('it calls onSubmit when it submits', function(assert) {
  let done = assert.async();
  const USER = 'foo';
  const PASSWORD = 'bar';
  this.set('onSubmit', this.mock('onSubmit').once().withArgs(USER, PASSWORD));

  this.render(hbs`{{auth-dialog onSubmit=onSubmit}}`);

  fillIn('[name=username]', USER).then(() => {
    fillIn('[name=password]', PASSWORD).then(() => {
      click('.auth-dialog__submit');
      done();
    });
  });
});
