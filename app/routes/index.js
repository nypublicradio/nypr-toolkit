import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
  model() {
    return config.embeds;
  }
});
