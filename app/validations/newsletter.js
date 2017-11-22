import {
  validatePresence
} from 'ember-changeset-validations/validators';

export default {
  mailchimpId: validatePresence({presence: true, message: "Mailchimp ID can't be blank."})
};
