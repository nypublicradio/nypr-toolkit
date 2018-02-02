import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import pym from 'pym';

export default Component.extend({
  classNames:        ['messaging-frame'],

  targetId: computed('src', function() {
    return guidFor(this.get('src'));
  }),

  didInsertElement() {
    let src      = get(this, 'src');
    let name     = get(this, 'name');
    let register = get(this, 'register');
    if (src && register) {
      let parent = new pym.Parent(this.get('targetId'), src);
      parent.onMessage('mounted', () => {
        register(name, src, parent);
      });
    }
  },

  actions: {
    expand(value) {
      this.set('isWide', value);
      this.get('expand')(value);
    }
  }
});
