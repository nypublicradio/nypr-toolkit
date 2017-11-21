import Component from '@ember/component';

export default Component.extend({
  tagName: 'label',
  classNames: ['labelled-input__label'],
  attributeBindings: ['for']
});
