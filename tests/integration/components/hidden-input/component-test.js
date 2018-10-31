import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('hidden-input', 'Integration | Component | hidden input', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{hidden-input}}`);

  assert.ok(find('.hidden-input'));
});
