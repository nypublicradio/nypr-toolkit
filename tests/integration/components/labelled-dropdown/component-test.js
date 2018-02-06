import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('labelled-dropdown', 'Integration | Component | labelled dropdown', {
  integration: true
});

skip('it renders', function(assert) {
  assert.expect(3);

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
});
