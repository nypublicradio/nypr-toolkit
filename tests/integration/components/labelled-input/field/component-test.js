import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('labelled-input/field', 'Integration | Component | labelled input/field', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{labelled-input/field}}`);

  assert.ok(find('input'), 'input fields renders');
  assert.equal(find('input').type, 'text', "it's a text field");
});
