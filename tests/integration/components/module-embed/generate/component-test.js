import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('module-embed/generate', 'Integration | Component | module embed/generate', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed/generate}}`);

  assert.ok(find('.module-embed__button'));
  assert.equal(this.$().text().trim(), 'Create it');

  // Template block usage:
  this.render(hbs`
    {{#module-embed/generate}}
      template block text
    {{/module-embed/generate}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
