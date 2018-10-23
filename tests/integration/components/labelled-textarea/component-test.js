import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('labelled-textarea', 'Integration | Component | labelled textarea', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{labelled-textarea}}`);

  assert.ok(find('.labelled-textarea'));
});
