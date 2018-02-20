import ScrollTo from 'ember-scroll-to/components/scroll-to';
import { computed } from '@ember/object';

export default ScrollTo.extend({
  jQueryElement: computed('href', function() {
    const href = this.get('href');

    return this
      .get('scroller')
      .getJQueryElement(`[name=${href.slice(1)}]`);
  }),
  scroll: null,
  click(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this
      .get('scroller')
      .scrollVertical(this.get('jQueryElement'), {
        duration: this.get('duration'),
        offset:   this.get('offset'),
        easing:   this.get('easing'),
        complete: () => history.pushState(null, null, this.get('href'))
      });
    }
})
