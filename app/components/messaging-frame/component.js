import Component from '@ember/component';
import { get } from '@ember/object';
import pym from 'pym';

export default Component.extend({
  classNames:        ['messaging-frame'],
  
  didInsertElement() {
    let src = get(this, 'src');
    let register = get(this, 'register');
    if (src) {
      let parent = new pym.Parent(this.elementId, src);
      if (register) {
        register(get(this, 'name'), src, parent.iframe);
      }
    }
  }
});
