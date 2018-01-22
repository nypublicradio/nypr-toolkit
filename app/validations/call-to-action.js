import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';
import validatePresenceIf from '../validators/presence-if';

export default {
  headline: validatePresence(true),
  callToAction: validatePresenceIf({otherField: 'url', otherFieldLabel: 'Button URL'}),
  url:[
    validateFormat({type: 'url', allowBlank: true, message: 'URL must be a valid web address.'}),
    validateFormat({regex: /^https?:\/\//, allowBlank: true, message: 'URL must begin with http:// or https://.'}),
    validatePresenceIf({otherField: 'callToAction', otherFieldLabel: 'Button text'}),
  ]
};
