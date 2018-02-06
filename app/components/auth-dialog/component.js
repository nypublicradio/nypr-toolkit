import Component from '@ember/component';
import AuthValidations from '../../validations/auth';
import { get } from '@ember/object';

export default Component.extend({
  validations: AuthValidations,

  callSubmit(changeset) {
    let snapshot = changeset.snapshot();
    return changeset.validate()
      .then(() => {
        if (get(changeset, 'isValid')) {
          changeset.execute();
          let { username, password } = changeset.getProperties('username', 'password');
          let onSubmit = get(this, 'onSubmit');
          if (onSubmit) {
            onSubmit(username, password);
          }
        }
      }).catch(() => changeset.restore(snapshot));
  },

  actions: {
    validateProperty(changeset, property) {
      return changeset.validate(property);
    }
  }
});
