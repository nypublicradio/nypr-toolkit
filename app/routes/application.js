import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session').staffAuth()
      .then(({ is_staff }) => {
        if (!is_staff) {
          this.transitionTo('login');
        }
      });
  }
});
