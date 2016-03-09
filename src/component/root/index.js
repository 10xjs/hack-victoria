/* global module require */
/* eslint-disable import/no-require */
if (__SERVER__) {
  module.exports = require('./root.server.js');
}

if (__CLIENT__) {
  module.exports = require('./root.client.js');
}
