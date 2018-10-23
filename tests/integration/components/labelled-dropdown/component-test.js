import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import wait from 'ember-test-helpers/wait';

moduleForComponent('labelled-dropdown', 'Integration | Component | labelled dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // 1. find,
  // setup component: 2. onChange, 3. set,
  // clear value on destroy: 4. onChange again 5. set again
  assert.expect(5);

  this.render(hbs`{{labelled-dropdown}}`);

  assert.ok(find('.labelled-dropdown'));

  this.setProperties({
    options: [{label: 'Foo', value: 'foo'}],
    key: 'test',
    changeset: {set() { assert.ok('sets changeset') }},
    onChange() { assert.ok('calls onChange') }
  });
  this.render(hbs`{{labelled-dropdown
                    key=key
                    changeset=changeset
                    onChange=onChange
                    options=options}}`);
  return wait();
});
