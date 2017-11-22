import { module, test } from 'qunit';
import validatePresenceIf from 'nypr-toolkit/validators/presence-if';

module('Unit | Validator | presence-if');

test('it exists', function(assert) {
  assert.ok(validatePresenceIf());
});
