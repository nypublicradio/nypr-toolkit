import Controller from '@ember/controller';
import CTAValidations from '../validations/call-to-action';
import NewsletterValidations from '../validations/newsletter';
import PlaylistValidations, { slugOrUrl } from '../validations/playlist';
import URL from 'url-parse';

export default Controller.extend({
  CTAValidations,
  NewsletterValidations,
  PlaylistValidations,
  slugOrUrl,

  init() {
    this._super(...arguments);
    this.set('playlistSubscriptions', {
      stories: [{
        message: 'not-found',
        callback(component, slug) {
          let changeset = component.get('listChangeset');
          let change = changeset.get('changes').find(({ value }) => value.split('/').filter(s => s).slice(-1)[0] === slug);
          if (change) {
            let { key } = change;
            changeset.addError(key, ["This is not a valid story or is not yet published. Double check the story's url."]);
          }
        }
      }]
    });
  },

  transformStoryURLs(value) {
    if (value.startsWith('http')) {
      if (value.endsWith('/')) {
        value = value.slice(0, -1);
      }
      let url = new URL(value);
      let [slug] = url.pathname.split('/').slice(-1);
      return slug;
    } else {
      return value;
    }
  }
});
