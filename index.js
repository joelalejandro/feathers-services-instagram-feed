'use strict';

// Initializes the `instagram` service on path `/mountPath`
const createService = require('./src/instagram.class.js');

module.exports = function (mountPath, username = null) {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'instagram',
    paginate,
    username: app.get('instagramUsername') || username
  };

  // Initialize our service with any options it requires
  app.use(mountPath, createService(options));
};
