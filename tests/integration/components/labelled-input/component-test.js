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

  assert.ok(find('.labelled-input'));

  // Template block usage:
  this.render(hbs`
    {{#labelled-input as |input|}}
      {{input.label 'Your Greeting'}}
      {{input.field 'e.g. hello world'}}
    {{/labelled-input}}
  `);

  assert.equal(find('.labelled-input__label').textContent.trim(), 'Your Greeting');
  assert.equal(find('.labelled-input__input').placeholder, 'e.g. hello world');

  this.render(hbs`
    {{#labelled-input as |input|}}
      {{#input.label}}
        Dogs or Cats?
      {{/input.label}}
      {{input.field 'e.g. dogs'}}
    {{/labelled-input}}
  `);

  assert.equal(find('.labelled-input__label').textContent.trim(), 'Dogs or Cats?');
  assert.equal(find('.labelled-input__input').placeholder, 'e.g. dogs');
});

test('it transforms camelized keys to a capitalized label', function(assert) {
  this.render(hbs`{{labelled-input 'fooBar'}}`);
  assert.equal(find('.labelled-input').textContent.trim(), 'Foo Bar');
});

test('it accepts a label param', function(assert) {
  this.render(hbs`{{labelled-input 'hello' 'world'}}`);
  assert.equal(find('.labelled-input').textContent.trim(), 'world');
});

test('it calls subscribe if a subscription matches its key', function(assert) {
  assert.expect(4);
  const KEY = 'FOO KEY';
  const CALLBACK = 'callback fn';
  const MESSAGE = 'message to subscribe to';
  this.setProperties({
    key: KEY,
    subscribe(component, message, callback) {
      assert.ok('subscribe called');
      assert.equal(component.get('key'), KEY, 'passed in component matches');
      assert.equal(message, MESSAGE);
      assert.equal(callback, CALLBACK);
    },
    subscriptions: {
      [KEY]: [{
        message: MESSAGE,
        callback: CALLBACK
      }]
    }
  });

  this.render(hbs`{{labelled-input key subscriptions=subscriptions subscribe=subscribe}}`);
})
