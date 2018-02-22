import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';

moduleForComponent('list-input/inputs', 'Integration | Component | list input/inputs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-input/inputs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#list-input/inputs inputs=3 as |inputs|}}
      {{inputs.input label='Hello World'}}
    {{/list-input/inputs}}
  `);

  assert.equal(findAll('.labelled-input').length, 3);
  assert.equal(find('.labelled-input').textContent.trim(), 'Hello World', 'yielded labelled input requires a named param');
});
