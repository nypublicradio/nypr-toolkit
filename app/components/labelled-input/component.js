import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { next } from '@ember/runloop';

const LabelledInput = Component.extend({
  tagName:    'label',
  classNames: ['labelled-input'],

  init() {
    this._super(...arguments);
    let { key, subscribe, changeset, value, onInput, onChange } =
      this.getProperties('key', 'subscribe', 'changeset', 'value', 'onInput', 'onChange');
    let subscribingTo = get(this, `subscriptions.${key}`) || [];

    subscribingTo.forEach(({ message, callback }) => subscribe(this, message, callback));

    if (value !== undefined && changeset) {
      if (onInput) {
        onInput(key, value);
      }
      if (onChange) {
        onChange(key, value);
      }
      next(() => {
        changeset.set(key, value);
      });
    }
  },
  willDestroyElement() {
    // Clear the changeset value when destroyed so toggling fields
    // with {{#if}} blocks doesn't leave side effects
    let changeset = this.get('changeset');
    let {key, onInput, onChange} = this.getProperties('key', 'onInput', 'onChange');
    if (onInput) {
      onInput(key, '');
    }
    if (onChange) {
      onChange(key, '');
    }
    if (changeset) {
      next(() => {
        changeset.set(key, '');
      });
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
