import LabelledInput from '../labelled-input/component';
import { get, set } from '@ember/object';

export default LabelledInput.extend({
  tagName:    'label',
  classNames: ['labelled-checkbox'],

  actions: {
    onChange() {
      let onChange = this.get('onChange');
      let changeset = get(this, 'changeset');
      let key = get(this, 'key');
      let newValue = !get(changeset, key);
      if (onChange) {
        onChange(key, newValue);
      }
      set(this, 'checked', newValue);
      set(changeset, key, newValue);
    }
  }
});
