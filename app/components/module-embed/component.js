import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['module-embed'],
  
  params: {},
  
  client: service('window-messenger-client'),
  
  actions: {
    register(name, src, element) {
      this.set('src', src);
      this.get('client').set(`targetOriginMap.${name}`, src);
      this.get('client').addTarget(name, element.contentWindow);
    },
    
    postMessage(key, value) {
      this.set(`params.${key}`, encodeURIComponent(value));
      this.get('client').fetch('call-to-action:update', { [key]: value });
    },
    
    generate() {
      let params = this.get('params');
      let queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
      this.set('embedCode', `${this.get('src')}?${queryParams}`);
      this.set('showDialog', true);
    },
  }
});
