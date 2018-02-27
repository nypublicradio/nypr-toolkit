import Component from '@ember/component';
import { computed, get } from '@ember/object';

const LabelledInput = Component.extend({
  tagName:    'label',
  classNames: ['labelled-input'],

  init() {
    this._super(...arguments);
    let subscriptions = get(this, 'subscriptions');
    if (subscriptions) {
      let subscribingTo = get(subscriptions, get(this, 'key'));
      if (subscribingTo && subscribingTo.length) {
        subscribingTo.forEach(({ message, callback }) => get(this, 'subscribe')(this, message, callback));
      }
    }
  },

  key: '',
  label: computed('key', function() {
    let key = this.get('key');
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }),

  onInput() {},
  subscribe() {}
});

LabelledInput.reopenClass({
  positionalParams: ['key', 'label']
});

export default LabelledInput;
