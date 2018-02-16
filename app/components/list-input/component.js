import Component from '@ember/component';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames: ['list-input'],

  inputs: 1,
  values: null,
  key: '',

  init() {
    this._super(...arguments);
    set(this, 'values', []);
  },
  add() {
    this.incrementProperty('inputs');
  },
  combineValues(index, _, value, transform) {
    let key     = get(this, 'key');
    let onInput = get(this, 'onInput');
    let values = get(this, 'values');
    let changeset = get(this, 'changeset');

    values[index] = value;
    set(this, 'values', values);

    if (transform) {
      values = values.map(transform);
    }
    let preparedValues = values.join(',');
    set(changeset, key, preparedValues);

    if (onInput) {
      onInput(key, preparedValues);
    }
  }
});
