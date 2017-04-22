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

## TODOs

Check out the [issues](https://github.com/joelalejandro/feathers-hooks-jsonapify/issues).

## Feel like contributing?

Knock yourself out! Fork the repo and make a PR.

## Licence

MIT