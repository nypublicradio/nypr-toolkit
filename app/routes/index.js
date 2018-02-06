import Route from '@ember/routing/route';
import config from '../config/environment';
import fetch from 'fetch';

let { embeds, themesIndex } = config;

export default Route.extend({
  redirect() {
    // this.transitionTo('get-started');
  },
  model() {
    return fetch(themesIndex).then(r => r.json());
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('embeds', embeds);
    controller.set('themes', model);
  },

});
