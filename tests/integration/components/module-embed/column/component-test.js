import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('module-embed/column', 'Integration | Component | module embed/column', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed/column}}`);

  assert.ok(find('.module-embed__column'));

  // Template block usage:
  this.render(hbs`
    {{#module-embed/column}}
      template block text
    {{/module-embed/column}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
