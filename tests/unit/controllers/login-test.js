import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import * as fetch from 'fetch'; // eslint-disable-line

moduleFor('controller:login', 'Unit | Controller | login', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it calls staffAuth on successful authentication', function() {
  this.mock(fetch).expects('default').once()
    .resolves({json: this.mock('json').resolves({success: true})});

  let controller = this.subject();
  this.mock(controller).expects('transitionToRoute').withArgs('get-started');

  controller.send('authenticate', 'user', 'password');
});
