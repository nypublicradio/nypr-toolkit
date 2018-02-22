import Component from '@ember/component';

const Label = Component.extend({
  tagName: 'label',
  classNames: ['labelled-input__label'],
  attributeBindings: ['for']
});

Label.reopenClass({
  positionalParams: ['text']
});

export default Label;
