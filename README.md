# NYPR Toolkit

The NYPR Toolkit site provides a interface for customizing engagement modules.

## Development

To develop interactively with other modules, you'll need to add URLs that point to live instances of each module. You can point to the demo versions or spin up local copies and point to those.

First make an env file. The sample file will point to the demo environment for each module.
```
$ cp .env.sample .env
```

Start your local server
```
$ ember serve
```

## Modules
The toolkit site will embed configurable instances of the following static apps:

- `call-to-action`: https://github.com/nypublicradio/nypr-call-to-action
- `newsletter-signup`: https://github.com/nypublicradio/nypr-newsletter-signup

Each of these has their own corresponding envvar which points at a running instance (described above).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Running Tests

* `ember test`
* `ember test --server`

## Deploying

Deployment is handled by circle. Commits to `master` will deploy to the demo environment (i.e. https://demo-apps.nypr.org/toolkit). Tagged commits will deploy to the production environment.

## Environment Variables

Name | Default | Description
--- | --- | ---
`AWS_BUCKET` | '' | Destination bucket for deploys
`AWS_PREFIX` | '' | Path prefix for deployed assets
`AWS_REGION` | '' | AWS Region for infrastructure
`AWS_ACCESS_KEY_ID` | '' | AWS access key id
`AWS_SECRET_ACCESS_KEY` | '' | AWS secret access key
`CALL_TO_ACTION` | `https://demo-apps.nypr.org/call-to-action/` | `call-to-action` url
`NEWSLETTER_SIGNUP` | `https://demo-apps.nypr.org/newsletter-signup/` | `newsletter-signup` url

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
