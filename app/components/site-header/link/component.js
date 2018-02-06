import Component from '@ember/component';

const LinkComponent = Component.extend({
  tagName: '',
});

LinkComponent.reopenClass({
  positionalParams: ['text', 'route']
});

export default LinkComponent;
