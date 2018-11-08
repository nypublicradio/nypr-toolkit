import LabelledInput from '../labelled-input/component';
import { get, set, observer } from '@ember/object';
import { next } from '@ember/runloop';

export default LabelledInput.extend({
  classNames: ['hidden-input'],
  valueChanged: observer('value', function() {
    let onChange = this.get('onChange');
    let changeset = get(this, 'changeset');
    let key = get(this, 'key');
    let newValue = get(this, 'value');
    next(() => {
      if (onChange) {
        onChange(key, newValue);
      }
      set(changeset, key, newValue);
    });
  })
});
