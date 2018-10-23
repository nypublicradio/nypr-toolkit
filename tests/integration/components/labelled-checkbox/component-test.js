import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('labelled-checkbox', 'Integration | Component | labelled checkbox', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{labelled-checkbox}}`);

  assert.ok(find('.labelled-checkbox'));
});
