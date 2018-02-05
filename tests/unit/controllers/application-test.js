import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import * as fetch from 'fetch'; // eslint-disable-line

moduleFor('controller:application', 'Unit | Controller | application', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it calls staffAuth on successful authentication', function() {
  this.mock(fetch).expects('default').once()
    .resolves({json: this.mock('json').resolves({success: true})});
  let controller = this.subject({
    session: {
      staffAuth: this.mock('staffAuth').once()
    }
  });

  controller.send('authenticate', 'user', 'password');
});
