import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

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
