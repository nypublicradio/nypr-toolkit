import Component from '@ember/component';

const AddButton = Component.extend({
  tagName: '',
  add() {}
});

AddButton.reopenClass({
  positionalParams: ['text']
});

export default AddButton;
