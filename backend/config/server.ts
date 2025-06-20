// path: backend/config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    // Pull in APP_KEYS as an array of at least two secret strings
    keys: env.array('APP_KEYS', ['defaultKey1', 'defaultKey2']),
  },
});
