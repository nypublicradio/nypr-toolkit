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
    let src = get(this, 'src');
    let register = get(this, 'register');
    if (src) {
      let parent = new pym.Parent(this.get('targetId'), src);
      if (register) {
        register(get(this, 'name'), src, parent.iframe);
      }
    }
  }
});
