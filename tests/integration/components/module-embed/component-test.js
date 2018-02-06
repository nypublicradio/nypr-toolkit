import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, click } from 'ember-native-dom-helpers';
import pym from 'pym';

moduleForComponent('module-embed', 'Integration | Component | module embed', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{module-embed}}`);

  assert.ok(find('.module-embed'), 'it renders');

  // Template block usage:
  this.render(hbs`
    {{#module-embed}}
      template block text
    {{/module-embed}}
  `);

  assert.ok(find('.module-embed'), 'it renders');
});

test('embeds and communicates with iframes', function(assert) {
  let done = assert.async();
  const PARAMS = {};
  const NAME = 'foo-name';
  const SRC = 'foo-src';
  const KEY = 'test-key'
  let mockFrame = {
    sendMessage: this.mock().once().withArgs('incoming', JSON.stringify({ [KEY]: 'foo' })),
    onMessage: this.mock().once().withArgs('mounted').callsArg(1)
  };
  this.setProperties({
    name: NAME,
    src: SRC,
    params: PARAMS,
    key: KEY
  });

  this.mock(pym)
    .expects('Parent')
    .once()
    .returns(mockFrame);

  this.render(hbs`
    {{#module-embed params=params as |embed|}}
      {{embed.iframe src=src name=name}}

      {{embed.input key=key changeset=embed.changeset}}

      {{embed.generateButton}}
    {{/module-embed}}
  `);

  fillIn('input', 'foo').then(() => {
    click('button').then(() => {
      assert.equal(PARAMS['test-key'], 'foo')
      let modal = find('.copy-block__input');
      const EMBED = `
<div data-pym-src="${SRC}?${KEY}=foo">Loading...</div>
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
      `;
      assert.equal(modal.textContent.trim(), EMBED.trim(), 'generates expected embed code');
      done();
    });
  });
});
