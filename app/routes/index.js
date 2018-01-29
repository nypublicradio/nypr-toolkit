import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
  redirect() {
    this.transitionTo('get-started');
  },
  model() {
    return config.embeds;
  }
});
