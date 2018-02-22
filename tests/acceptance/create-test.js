import { test } from 'qunit';
import moduleForAcceptance from 'nypr-toolkit/tests/helpers/module-for-acceptance';
import config from 'nypr-toolkit/config/environment';
import pym from 'pym';
import sinon from 'sinon';

moduleForAcceptance('Acceptance | create', {
  beforeEach() {
    server.get(`${config.adminRoot}/api/v1/is_logged_in/`, () => ({is_staff: true}));
    let stubFrame = {
      sendMessage: sinon.stub(),
      onMessage: sinon.stub().callsArg(1)
    };
    sinon.stub(pym, 'Parent').returns(stubFrame);

  },
  afterEach() {
    server.shutdown();
    pym.Parent.restore();
  }
});

test('visiting /create', function(assert) {
  visit('/create');

  andThen(function() {
    assert.equal(currentURL(), '/create');
  });
});

test('filling in the playlist form', function(assert) {
  visit('/create');

  andThen(function() {
    assert.equal(currentURL(), '/create');
    click('.nypr-playlist .module-embed__button');
  });

  andThen(function() {
    let text = find('.labelled-input__errors').text().split('\n').map(s => s.trim()).filter(s => s).join(', ');
    assert.equal(text, "Title can't be blank, Stories can't be blank");

    fillIn('.nypr-playlist [name=stories_0]', 'cats;');
  });

  andThen(function() {
    let text = find('[name=stories_0]').next().text().trim();
    assert.equal(text, 'Please enter a story slug or an absolute url', 'story URLs can only be slugs or aboslute URLs');

    fillIn('.nypr-playlist [name=title]', 'Hello World');
    fillIn('.nypr-playlist [name=stories_0]', 'rebar');

    click('.nypr-playlist .module-embed__button');
  });

  andThen(function() {
    let text = find('.labelled-input__errors').text().split('\n').map(s => s.trim()).filter(s => s).join(', ')
    assert.equal(text, 'Must have at least 2 Story URLs', '2 story urls are required');

    fillIn('.nypr-playlist [name=stories_1]', 'cats-and-dogs');
    click('.nypr-playlist .module-embed__button');
  });

  andThen(function() {
    let text = find('.copy-block__input').text();
    let title = encodeURIComponent('Hello World');
    let stories = encodeURIComponent('rebar,cats-and-dogs');
    assert.equal(text, [
      `<div data-pym-src="${config.embeds.playlist}?title=${title}&stories=${stories}">Loading...</div>`,
      '<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>'
    ].join('\n'));
  }, 'values are passed to embed code');
});
