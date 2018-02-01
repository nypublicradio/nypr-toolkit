import LabelledInput from '../labelled-input/component';
import { later } from '@ember/runloop';

export default LabelledInput.extend({
  tagName: 'div',
  classNames: ['labelled-dropdown'],

  didInsertElement() {
    this._super(...arguments);
    later(() => this.send('onChange', this.get('options.firstObject')), 50);
  },

  actions: {
    onChange(item) {
      this.set('selected', item);
      this.get('changeset').set(this.get('key'), item.value);
      this.get('onChange')(this.get('key'), item.value);
    }
  }
});
