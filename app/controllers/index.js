import Controller from '@ember/controller';
import CTAValidations from '../validations/call-to-action';
import NewsletterValidations from '../validations/newsletter';

export default Controller.extend({
  CTAValidations,
  NewsletterValidations
});
