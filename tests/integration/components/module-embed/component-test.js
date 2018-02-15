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
  const ARRAY_KEY = 'array-key';

  let sendMock = this.stub();
  let mockFrame = {
    sendMessage: sendMock,
    onMessage: this.mock().once().withArgs('mounted').callsArg(1)
  };
  this.setProperties({
    name: NAME,
    src: SRC,
    params: PARAMS,
    key: KEY,
    arrayKey: ARRAY_KEY
  });

  this.mock(pym)
    .expects('Parent')
    .once()
    .returns(mockFrame);

  this.render(hbs`
    {{#module-embed params=params as |embed|}}
      {{embed.iframe src=src name=name}}

      {{embed.input key=key changeset=embed.changeset class="text"}}

      {{#embed.list inputs=2 changeset=embed.changeset key=arrayKey as |list|}}
        {{#list.inputs as |inputs|}}
          {{inputs.input}}
        {{/list.inputs}}

        {{list.add '+ Add more audio to the playlist'}}
      {{/embed.list}}

      {{embed.generateButton class='generate-button'}}
    {{/module-embed}}
  `);

  let firstListInput = find('.list-input .labelled-input:nth-child(1) input');
  let secondListInput = find('.list-input .labelled-input:nth-child(2) input');

  return fillIn('.text input', 'foo')
    .then(() => fillIn(firstListInput, 'bar')
      .then(() => {
        assert.notEqual(firstListInput.value, secondListInput.value);
      }).then(() => fillIn(secondListInput, 'baz')
        .then(() => click('.module-embed__button').then(() => {
          let mockCalls = sendMock.getCalls();
          let [inputCall, arrayCall1, arrayCall2] = mockCalls;

          assert.equal(inputCall.args[0], 'incoming');
          assert.equal(inputCall.args[1], JSON.stringify({ [KEY]: 'foo' }));

          assert.equal(arrayCall1.args[0], 'incoming');
          assert.equal(arrayCall1.args[1], JSON.stringify({ [ARRAY_KEY]: 'bar' }));

          assert.equal(arrayCall2.args[0], 'incoming');
          assert.equal(arrayCall2.args[1], JSON.stringify({ [ARRAY_KEY]: 'bar,baz' }));

          assert.equal(PARAMS['test-key'], 'foo')
          assert.equal(PARAMS['array-key'], 'bar,baz');

          let modal = find('.copy-block__input');
          const EMBED = `
<div data-pym-src="${SRC}?${KEY}=foo&${ARRAY_KEY}=bar%2Cbaz">Loading...</div>
<script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
          `;
          assert.equal(modal.textContent.trim(), EMBED.trim(), 'generates expected embed code');
          done();
        })
      )
    )
  )
});
