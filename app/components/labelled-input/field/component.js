import TextField from '@ember/component/text-field';

const Input = TextField.extend({
  classNameBindings: ['hasError']
});

Input.reopenClass({
  positionalParams: ['placeholder']
});

export default Input;
