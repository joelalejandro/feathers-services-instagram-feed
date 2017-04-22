# feathers-service-instagram-feed
A FeathersJS service that allows to fetch a given user's Instagram feed via its public endpoints.

## Installing

Simply run `npm install --save feathers-services-instagram-feed` and you're good to go!

## Usage

Require the service, configuring the `mountPath` and the `instagramUsername`.

```js
const instagramFeed = require('feathers-services-instagram-feed')('/instagram', 'my_instagram_user_name');
```

> *Tip:* The username can also be set on the app's configuration, under a key named `instagramUsername`.

Then bind it to the app:

```js
app.configure(instagramFeed);
```

## Caching strategy

The service will cache Instagram's response for a lapse of 15 minutes, in order to prevent abuse.

## TODOs

Check out the [issues](https://github.com/joelalejandro/feathers-hooks-jsonapify/issues).

## Feel like contributing?

Knock yourself out! Fork the repo and make a PR.

## Licence

MIT