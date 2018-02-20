import Route from '@ember/routing/route';
import config from '../config/environment';
import fetch from 'fetch';
import RSVP from 'rsvp';

let { embeds, themesIndex, mailchimpProxy } = config;

export default Route.extend({
  model() {
    let themes = fetch(themesIndex)
      .then(r => r.json());
    let mailchimpLists = fetch(`${mailchimpProxy}/lists?fields=lists.name,lists.id&count=200`)
      .then(r => r.json())
      .then(({lists}) => lists.map(({name, id}) => ({label: name, value: id})));

    return RSVP.hash({
      themes,
      mailchimpLists,
      embeds: RSVP.Promise.resolve(embeds)
    });
  }
});
