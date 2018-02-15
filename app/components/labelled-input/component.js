import Component from '@ember/component';
import { computed } from '@ember/object';

const LabelledInput = Component.extend({
  tagName:    'label',
  classNames: ['labelled-input'],

  key: '',
  label: computed('key', function() {
    let key = this.get('key');
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }),

  onInput() {}
});

LabelledInput.reopenClass({
  positionalParams: ['key', 'label']
});

export default LabelledInput;
