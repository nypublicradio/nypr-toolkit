import LabelledInput from '../labelled-input/component';
import { later } from '@ember/runloop';
import { get } from '@ember/object';

export default LabelledInput.extend({
  tagName: 'div',
  classNames: ['labelled-dropdown'],
  searchEnabled: false,

  matcher({ label }, query) {
    return label.toLowerCase().indexOf(query.toLowerCase());
  },

  didInsertElement() {
    this._super(...arguments);
    let option = get(this, 'options.firstObject');
    let placeholder = get(this, 'placeholder');
    if (!option || placeholder) {
      return;
    }
    later(() => this.send('onChange', option), 50);
  },

  actions: {
    onChange(item) {
      let onChange = this.get('onChange');
      if (onChange) {
        onChange(this.get('key'), item.value);
      }
      this.set('selected', item);
      this.get('changeset').set(this.get('key'), item.value);
    }
  }
});
