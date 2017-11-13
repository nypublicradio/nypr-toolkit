import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('module-embed', 'Integration | Component | module embed', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed}}`);

  assert.ok(find('.module-embed'), 'it renders');

  // Template block usage:
  this.render(hbs`
    {{#module-embed}}
      template block text
    {{/module-embed}}
  `);

  assert.ok(find('.module-embed'), 'it renders');
});
