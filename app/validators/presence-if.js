import buildMessage from 'ember-changeset-validations/utils/validation-errors';

export default function validatePresenceIf({ otherField, otherFieldLabel } = {}) {
  return (key, newValue, oldValue, changes/*, content*/) => {
    if (changes[otherField]) {
      return !!newValue || buildMessage(key, {type: 'presenceIf', context: { otherFieldLabel }});
    } else {
      return true;
    }
  };
}
