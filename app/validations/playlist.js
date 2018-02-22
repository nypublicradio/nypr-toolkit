import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';
import commaListLength from '../validators/comma-list-length';
import validateFormat from 'ember-validators/format';

export default {
  title: validatePresence({presence: true}),
  blurb: validateLength({max: 110}),
  stories: [
    commaListLength({length: 2, label: 'Story URLs'}),
    validatePresence({presence: true})
  ]
};

export function slugOrUrl({ newValue }) {
  const MESSAGE = 'Please enter a story slug or an absolute url';
  let urlValidation = validateFormat(newValue, {type: 'url', allowBlank: true});
  let slugValidation = validateFormat(newValue, {regex: /^[a-z\d-_]+$/, allowBlank: true});

  let isURL = urlValidation === true;
  let isSlug = slugValidation === true;

  if (!isSlug && !isURL) {
    return [MESSAGE];
  } else {
    return true;
  }
}
