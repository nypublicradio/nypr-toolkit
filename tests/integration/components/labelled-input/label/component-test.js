import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('labelled-input/label', 'Integration | Component | labelled input/label', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{labelled-input/label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#labelled-input/label}}
      template block text
    {{/labelled-input/label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
