import Component from '@ember/component';

export default Component.extend({
  classNames: ['copy-block'],
  
  didInsertElement() {
    let input = document.getElementById('copy-paste');
    this.$(input).height(0).height(input.scrollHeight);
  },
  
  clearSelection() {
    window.getSelection().removeAllRanges();
  },
  
  actions: {
    selectOrCopy() {
      let selection = window.getSelection();
      if (!selection.toString()) {
        this.send('copy');
      }
    },
    copy() {
      let input = document.getElementById('copy-paste');
      input.select();
      let success = document.execCommand('copy');
      if (success) {
        this.set('copied', true);
        this.clearSelection();
      } else {
        input.readOnly = false;
        let range = document.createRange();
        range.selectNodeContents(input);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        input.setSelection(0, 99999);
        input.readOnly = true;
        let success = document.execCommand('copy');
        input.blur();
        if (success) {
          this.set('copied', true);
        }
      }
    }
  }
});
