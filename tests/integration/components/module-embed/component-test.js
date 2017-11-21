import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, click } from 'ember-native-dom-helpers';

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
  let mockClient = {
    set: this.mock().once().withArgs(`targetOriginMap.${NAME}`, SRC),
    addTarget: this.mock().once().withArgs(NAME),
    fetch: this.mock().once().withArgs(`${NAME}:update`, { [KEY]: 'foo' })
  };
  this.setProperties({
    name: NAME,
    src: SRC,
    client: mockClient,
    params: PARAMS,
    key: KEY
  });
  
  this.render(hbs`
    {{#module-embed client=client params=params as |embed|}}
      {{embed.iframe src=src name=name}}
      
      {{labelled-input key=key onInput=embed.sendMessage}}
      
      {{embed.generateButton}}
    {{/module-embed}}
  `);
  
  fillIn('input', 'foo').then(() => {
    assert.equal(PARAMS['test-key'], encodeURIComponent('foo'));
    done();
    
    click('button');
    let modal = find('.copy-block__input');
    const EMBED = `
<div data-pym-src="${SRC}?${KEY}=foo">Loading...</div>
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
    `;
    assert.equal(modal.textContent.trim(), EMBED.trim(), 'generates expected embed code');
  });
});
