import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['character-counter'],
  classNameBindings: ['limitExceeded:character-counter--limit-exceeded'],
  text: '',
  limit: 100,
  count: computed('text', function() {
    let text = get(this, 'text') || '';
    return text.length;
  }),
  remaining: computed('limit', 'count', function() {
    return get(this, 'limit') - get(this, 'count');
  }),
  limitExceeded: computed.lt('remaining', 0)
});
