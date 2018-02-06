import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import config from 'nypr-toolkit/config/environment';
import fetch from 'fetch';

export default Controller.extend({
  session: service(),

  isStaff: reads('session.data.isStaff'),

  actions: {
    authenticate(username, password) {
      // legacy endpoints require form encoding
      let body = `username=${username}&password=${password}`;
      fetch(`${config.adminRoot}/api/v1/accounts/login/`, {
        body,
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(r => r.json())
        .then(({ success }) => {
          if (success) {
            this.get('session').staffAuth();
          }
        });
    }
  }
});
