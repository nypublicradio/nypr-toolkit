import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it calls staffAuth in the beforeModel hook', function() {
  let route = this.subject({
    session: {
      staffAuth: this.mock('staffAuth').once().resolves({is_staff: false})
    }
  });

  this.mock(route).expects('transitionTo').withArgs('login');

  route.beforeModel();
})
