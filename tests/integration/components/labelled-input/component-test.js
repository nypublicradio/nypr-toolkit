import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('labelled-input', 'Integration | Component | labelled input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{labelled-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#labelled-input}}
      template block text
    {{/labelled-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it transforms camelized keys to a capitalized label', function(assert) {
  this.render(hbs`{{labelled-input 'fooBar'}}`);
  assert.equal(find('.labelled-input').textContent.trim(), 'Foo Bar');
});

test('it accepts a label param', function(assert) {
  this.render(hbs`{{labelled-input 'hello' 'world'}}`);
  assert.equal(find('.labelled-input').textContent.trim(), 'world');
})
