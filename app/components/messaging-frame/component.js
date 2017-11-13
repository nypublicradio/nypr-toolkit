import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  client:            service('window-messenger-client'),
  tagName:           'iframe',
  attributeBindings: ['src', 'height'],
  
  didInsertElement() {
    this.get('register')(this.get('name'), this.get('src'), this.element);
  }
});
