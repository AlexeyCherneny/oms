const proxy = require('http-proxy-middleware');

const stubs = process.argv.includes('--stubs') || process.argv.includes('--stubs=true');
const api = stubs ? 'http://localhost:3100/' : 'http://www.backend.oms.com/';

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: api,
      changeOrigin: true,
    })
  );
};
