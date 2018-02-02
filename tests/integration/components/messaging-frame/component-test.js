import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import pym from 'pym';

moduleForComponent('messaging-frame', 'Integration | Component | messaging frame', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{messaging-frame}}`);

  assert.ok(find('.messaging-frame'), 'it renders');

  // Template block usage:
  this.render(hbs`
    {{#messaging-frame}}
      template block text
    {{/messaging-frame}}
  `);

  assert.ok(find('.messaging-frame'), 'it renders');
});

test('it registers with pym if there is a src and register function', function() {
  this.set('register', () => {});
  this.mock(pym)
    .expects('Parent')
    .once()
    .withArgs('idFoo', 'srcFoo')
    .returns({onMessage() {}});

  this.render(hbs`{{messaging-frame targetId='idFoo' src='srcFoo' register=register}}`);
})

test('it registers with the parent context if provided a register function', function() {
  let parent = {onMessage(type, fn) { fn() }};
  this.stub(pym, 'Parent')
    .returns(parent);
  let mock = this.mock().once().withArgs('foo-name', 'srcFoo', parent);
  this.set('register', mock);

  this.render(hbs`{{messaging-frame src='srcFoo' register=register name='foo-name'}}`);
});
