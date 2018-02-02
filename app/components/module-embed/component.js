import Component from '@ember/component';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend({
  tagName: 'section',
  classNames: ['module-embed'],

  params: {},

  init() {
    this._super(...arguments);
    let { params, validations } = this.getProperties('params', 'validations');
    this.set('changeset', new Changeset(params, lookupValidator(validations), validations, { skipValidate: true }));
  },

  actions: {
    register(name, src, frame) {
      this.set('src', src);
      this.set('name', name);
      this.set('frame', frame);
    },

    postMessage(key, value) {
      this.get('client').fetch(`${this.get('name')}:update`, { [key]: value });
    },

    generate() {
      let changeset = this.get('changeset');
      changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          changeset.save().then(() => {
            let params = this.get('params');
            let queryParams = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
            this.set('embedCode', `${this.get('src')}${queryParams ? `?${queryParams}` : ''}`);
            this.set('showDialog', true);
          });
        }
      });
    },
  }
});
