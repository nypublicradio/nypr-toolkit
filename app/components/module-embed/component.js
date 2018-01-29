import Component from '@ember/component';
import { inject as service } from '@ember/service';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Component.extend({
  tagName: 'section',
  classNames: ['module-embed'],
  
  
  // if params are passed in, use those
  // otherwise set a new blank object in init so state isn't shared
  params: null,
  client: service('window-messenger-client'),
  
  init() {
    this._super(...arguments);
    if (!this.get('params')) {
      this.set('params', {});
    }
    let { validations, params } = this.getProperties('params', 'validations');
    this.set('changeset', new Changeset(params, lookupValidator(validations), validations, { skipValidate: true }));
  },
  
  actions: {
    register(name, src, element) {
      this.set('src', src);
      this.set('name', name);
      this.get('client').set(`targetOriginMap.${name}`, src);
      this.get('client').addTarget(name, element.contentWindow);
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
