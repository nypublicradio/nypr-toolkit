import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('copy-block', 'Integration | Component | copy block', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{copy-block}}`);

  assert.ok(find('textarea'), 'renders a textarea');

  // Template block usage:
  this.render(hbs`
    {{#copy-block}}
      template block text
    {{/copy-block}}
  `);

  assert.equal(find('textarea').textContent.trim(), 'template block text', 'renders out block');
});
