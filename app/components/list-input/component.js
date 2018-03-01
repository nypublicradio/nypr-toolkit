import Component from '@ember/component';
import { get, set } from '@ember/object';
import Changeset from 'ember-changeset';

export default Component.extend({
  classNames: ['list-input'],

  inputs: 1,
  key: '',

  init() {
    this._super(...arguments);
    let { inputValidation, subscribe, key } = this.getProperties('inputValidation', 'subscribe', 'key');

    let changeset = new Changeset({}, inputValidation);
    set(this, 'listChangeset', changeset);

    let subscribingTo = get(this, `subscriptions.${key}`) || [];
    subscribingTo.forEach(({ message, callback }) => subscribe(this, message, callback));
  },
  add() {
    this.incrementProperty('inputs');
  },
  combineValues(key, value, transform) {
    key = key.split('_')[0];
    let listChangeset = get(this, 'listChangeset');
    let values = listChangeset.get('changes').map(({value}) => value);
    let onInput = get(this, 'onInput');
    let changeset = get(this, 'changeset');

    if (transform) {
      values = values.map(transform);
    }
    let preparedValues = values.without('').join(',');
    set(changeset, key, preparedValues);

    if (onInput) {
      onInput(key, preparedValues);
    }
  },

  subscribe() {}
});
