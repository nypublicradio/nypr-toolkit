import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('list-input/add-button', 'Integration | Component | list input/add button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-input/add-button 'foo'}}`);

  assert.ok(find('.list-input__add'));

  // Template block usage:
  this.render(hbs`
    {{#list-input/add-button}}
      template block text
    {{/list-input/add-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
