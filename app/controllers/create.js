import Controller from '@ember/controller';
import CTAValidations from '../validations/call-to-action';
import NewsletterValidations from '../validations/newsletter';
import PlaylistValidations from '../validations/playlist';
import URL from 'url-parse';

export default Controller.extend({
  CTAValidations,
  NewsletterValidations,
  PlaylistValidations,

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
  },

  validateStoryItem({ newValue }) {
    let message = 'Please enter a story slug or an absolute url';
    let isURL = newValue.startsWith('http');
    let isSlug = newValue.match(/[a-z0-9-]+/);

    if (!isSlug && !isURL) {
      return [message];
    } else if (isSlug || isURL) {
      return true;
    }
  }
});
