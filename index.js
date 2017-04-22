'use strict';

// Initializes the `instagram` service on a given path
const createService = require('./src/instagram.class.js');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'instagram',
    paginate,
    username: app.get('instagram').username
  };

  // Initialize our service with any options it requires
  app.use(app.get('instagram').mountPath, createService(options));
};
