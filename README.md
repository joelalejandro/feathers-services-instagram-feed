# feathers-service-instagram-feed
A FeathersJS service that allows to fetch a given user's Instagram feed via its public endpoints.

## Installing

Simply run `npm install --save feathers-services-instagram-feed` and you're good to go!

## Usage

Add the following entry to your app configuration:

```json
"instagram": {
    "username": "my_username",
    "mountPath": "/ig"
}
```

Where:

- `username` is the account from which the service will fetch the media
- `mountPath` is the API's endpoint that will serve the service's response

Then, require the service (if you're using the Feathers CLI, you can do this in your `services/index.js` file):

```js
const instagramFeed = require('feathers-services-instagram-feed');
```

And finally, bind it to the app:

```js
app.configure(instagramFeed);
```

## Caching strategy

The service will cache Instagram's response for a lapse of 15 minutes, in order to prevent abuse.

## Hey! Where are my hooks?

Don't worry! Despite the service doesn't include hooks by default, you can apply them after the service is configured in your app.

Let's suppose your API uses [`feathers-hooks-jsonapify`](https://github.com/joelalejandro/feathers-hooks-jsonapify)(*) and you want the user's Instagram feed also serialized as JSON API. 

<small>(*) = shameless self-promotion</small>
### The straight-forward way

```js
// app.js, at the "requires" section
const jsonapify = require('feathers-hooks-jsonapify');

// app.js, after `app.configure(services)`
app.service(app.get('instagram').mountPath).hooks({ after: { find: [ jsonapify() ] } });
```

### The `Feathers CLI` way

```js
// services/instagram/instagram.hooks.js
'use strict';

const jsonapify = require('feathers-hooks-jsonapify');

module.exports = {
  before: { /* ... */ }
  after: {
    all: [],
    find: [jsonapify()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: { /* ... */ }
};

// app.js, at the "requires" section
const instagramHooks = require('./services/instagram/instagram.hooks');

// app.js, after `app.configure(services)`
app.service(app.get('instagram').mountPath).hooks(instagramHooks);
```

## TODOs

Check out the [issues](https://github.com/joelalejandro/feathers-hooks-jsonapify/issues).

## Feel like contributing?

Knock yourself out! Fork the repo and make a PR.

## Licence

MIT