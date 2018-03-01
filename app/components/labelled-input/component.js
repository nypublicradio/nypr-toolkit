import Component from '@ember/component';
import { computed, get } from '@ember/object';

const LabelledInput = Component.extend({
  tagName:    'label',
  classNames: ['labelled-input'],

  init() {
    this._super(...arguments);
    let { key, subscribe } = this.getProperties('key', 'subscribe');
    let subscribingTo = get(this, `subscriptions.${key}`) || [];

    subscribingTo.forEach(({ message, callback }) => subscribe(this, message, callback));
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
