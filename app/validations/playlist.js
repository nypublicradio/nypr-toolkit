import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';
import commaListLength from '../validators/comma-list-length';

export default {
  title: validatePresence({presence: true}),
  blurb: validateLength({max: 110}),
  stories: [
    commaListLength({length: 2, label: 'Story URLs'}),
    validatePresence({presence: true})
  ]
};
