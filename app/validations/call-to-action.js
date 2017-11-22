import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';
import validatePresenceIf from '../validators/presence-if';

export default {
  headline: validatePresence(true),
  summary: validatePresence({presence: true, message: "Short blurb can't be blank"}),
  callToAction: validatePresenceIf({otherField: 'url', otherFieldLabel: 'Button URL'}),
  url:[
    validateFormat({type: 'url', allowBlank: true, message: 'URL must be a valid web address.'}),
    validateFormat({regex: /^https?:\/\//, allowBlank: true, message: 'URL must begin with http:// or https://.'}),
    validatePresenceIf({otherField: 'callToAction', otherFieldLabel: 'Button text'}),
  ]
};
