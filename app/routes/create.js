import Route from '@ember/routing/route';
import config from '../config/environment';
import fetch from 'fetch';
import RSVP from 'rsvp';

let { embeds, themesIndex, mailchimpProxy } = config;

export default Route.extend({
  model() {
    let themes = fetch(themesIndex)
      .then(r => r.json());
    let mailchimpLists = fetch(`${mailchimpProxy}/lists`)
      .then(r => r.json())
      .then(({lists}) => lists.sort((a, b) => a.localeCompare(b)).map(l => {
        return {'label': l, 'value': l}
      }))
    let partnerOrgs = [
      {label: 'ProPublica', value: 'ProPublica'},
      {label: 'Other', value: 'Other'}
    ];

    return RSVP.hash({
      themes,
      mailchimpLists,
      embeds: RSVP.Promise.resolve(embeds),
      partnerOrgs
    });
  }
});
