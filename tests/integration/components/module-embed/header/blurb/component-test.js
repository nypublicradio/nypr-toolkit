import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('module-embed/header/blurb', 'Integration | Component | module embed/header/blurb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed/header/blurb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#module-embed/header/blurb}}
      template block text
    {{/module-embed/header/blurb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
