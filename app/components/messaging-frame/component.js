import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  client:            service('window-messenger-client'),
  classNames:        ['messaging-frame'],
  tagName:           'iframe',
  attributeBindings: ['src', 'height'],
  
  didInsertElement() {
    let register = get(this, 'register');
    if (register) {
      register(get(this, 'name'), get(this, 'src'), get(this, 'element'));
    }
  }
});
