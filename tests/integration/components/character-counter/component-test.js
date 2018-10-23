import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('character-counter', 'Integration | Component | character counter', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{character-counter}}`);
  assert.equal(this.$().text().trim(), '100 Characters Left');
});

test('it accepts a custom limit', function(assert) {
  this.render(hbs`{{character-counter limit=5}}`);
  assert.equal(this.$().text().trim(), '5 Characters Left');
});

test('it counts the characters', function(assert) {
  this.render(hbs`{{character-counter limit=5 text='abc'}}`);
  assert.equal(this.$().text().trim(), '2 Characters Left');

  this.render(hbs`{{character-counter limit=5 text='abcd'}}`);
  assert.equal(this.$().text().trim(), '1 Character Left');

  this.render(hbs`{{character-counter limit=5 text='abcde'}}`);
  assert.equal(this.$().text().trim(), '0 Characters Left');

  this.render(hbs`{{character-counter limit=5 text='abcdefg'}}`);
  assert.equal(this.$().text().trim(), '-2 Characters Left');
});
