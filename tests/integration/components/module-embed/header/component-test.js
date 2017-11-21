import { moduleForComponent, test } from 'ember-qunit';
import { find } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('module-embed/header', 'Integration | Component | module embed/header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed/header}}`);

  assert.ok(find('.module-embed__header'));

  // Template block usage:
  this.render(hbs`
    {{#module-embed/header}}
      template block text
    {{/module-embed/header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
