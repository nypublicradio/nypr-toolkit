import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click, findAll, fillIn } from 'ember-native-dom-helpers';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('list-input', 'Integration | Component | list input', {
  integration: true
});

test('usage', function(assert) {
  this.set('changeset', {});
  this.render(hbs`
    {{#list-input changeset=changeset as |list|}}

      {{#list.inputs as |inputs|}}
        {{inputs.input label='Basket Item' placeholder='e.g. apple'}}
      {{/list.inputs}}

      {{list.add '+ Add another'}}
    {{/list-input}}
  `);

  assert.ok(find('.list-input'));
  assert.equal(find('.labelled-input__label').textContent.trim(), 'Basket Item');
  assert.equal(find('.labelled-input__input').placeholder, 'e.g. apple');
  assert.equal(find('.list-input__add').textContent.trim(), '+ Add another');

  return fillIn('.labelled-input__input', 'toaster').then(() => {
    return click('.list-input__add').then(() => {
      assert.equal(findAll('.labelled-input').length, 2, 'should add another input after clicking');
      assert.equal(find('.labelled-input__input').value, 'toaster', 'initial value should remain after adding an input');
    });
  });
});

test('it sends ups the expected values', function(assert) {
  const KEY = 'test-key';
  let inputSpy = this.spy();
  this.setProperties({
    onInput: inputSpy,
    key: KEY,
    changeset: {}
  });

  this.render(hbs`
    {{#list-input changeset=changeset onInput=onInput key=key as |list|}}
      {{#list.inputs as |inputs|}}
        {{inputs.input}}
      {{/list.inputs}}

      {{list.add '+ Add another'}}
    {{/list-input}}
  `);

  return fillIn('.labelled-input:nth-child(1) input', 'fridge').then(() => {
    return click('.list-input__add').then(() => {
      return fillIn('.labelled-input:nth-child(2) input', 'oven').then(() => {
        return fillIn('.labelled-input:nth-child(1) input', 'refrigerator').then(() => {
          let calls = inputSpy.getCalls();
          assert.deepEqual(calls[0].args, [KEY, 'fridge']);
          assert.deepEqual(calls[1].args, [KEY, 'fridge,oven']);
          assert.deepEqual(calls[2].args, [KEY, 'refrigerator,oven']);
        });
      });
    });
  });
});

test('it calls subscribe if a subscription matches its key', function(assert) {
  assert.expect(4);
  const KEY = 'TEST KEY';
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

  this.render(hbs`
    {{list-input key=key subscriptions=subscriptions subscribe=subscribe}}
  `);
});
