import Component from '@ember/component';
import { get, set } from '@ember/object';
import Changeset from 'ember-changeset';

export default Component.extend({
  classNames: ['list-input'],

  inputs: 1,
  key: '',

  init() {
    this._super(...arguments);
    let { inputValidation, subscriptions } = this.getProperties('inputValidation', 'subscriptions');
    let changeset = new Changeset({}, inputValidation);
    set(this, 'listChangeset', changeset);

    if (subscriptions) {
      let subscribingTo = get(subscriptions, get(this, 'key'));
      if (subscribingTo && subscribingTo.length) {
        subscribingTo.forEach(({ message, callback }) => get(this, 'subscribe')(this, message, callback));
      }
    }
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
