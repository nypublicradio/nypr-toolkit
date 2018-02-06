import Route from '@ember/routing/route';
import config from '../config/environment';
import fetch from 'fetch';

let { embeds, themesIndex } = config;

export default Route.extend({
  model() {
    return fetch(themesIndex)
      .then(r => r.json()).then(themes => ({themes, embeds}));
  }
});
