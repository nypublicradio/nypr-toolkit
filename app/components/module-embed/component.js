import Component from '@ember/component';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import { bool } from '@ember/object/computed';
import { later } from '@ember/runloop';

const { assign } = Object;

export default Component.extend({
  tagName: 'section',
  classNames: ['module-embed'],

  pendingRegistrations: null,
  pendingSubscriptions: null,
  // if params are passed in, use those
  // otherwise set a new blank object in init so state isn't shared
  params: null,
  registered: bool('frame'),

  init() {
    this._super(...arguments);
    if (!this.get('params')) {
      this.set('params', {});
    }
    let { validations, params } = this.getProperties('params', 'validations');
    this.set('changeset', new Changeset(params, lookupValidator(validations), validations, { skipValidate: true }));

    this.set('pendingRegistrations', []);
    this.set('pendingSubscriptions', []);
  },

  flushRegistrations() {
    if (this.get('registered')) {
      let flushed = this.get('pendingRegistrations').reduce((flush, datum) => assign(flush, datum), {});
      this.get('frame').sendMessage('incoming', JSON.stringify(flushed));
      this.set('pendingRegistrations', []);
    } else {
      later(this, 'flushRegistrations', 50);
    }
  },

  flushSubscriptions(frame) {
    let subs = this.get('pendingSubscriptions');
    this.set('pendingSubscriptions', []);

    subs.forEach(({component, message, callback}) => {
      frame.onMessage(message, callback.bind(null, component));
    })
  },

  subscribe(component, message, callback) {
    this.get('pendingSubscriptions').push({component, message, callback});
  },

  actions: {
    register(name, src, frame) {
      this.set('src', src);
      this.set('name', name);
      this.set('frame', frame);

      if (this.get('pendingSubscriptions.length')) {
        this.flushSubscriptions(frame);
      }
    },

    postMessage(key, value) {
      let data = {[key]: value};
      this.get('pendingRegistrations').pushObject(data);
      this.flushRegistrations();
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
