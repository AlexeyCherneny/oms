const proxy = require("http-proxy-middleware");

const stubs =
  process.argv.includes("--stubs") || process.argv.includes("--stubs=true");

let api = process.env.PRODUCTION_API_URL;

if (process.env.NODE_ENV === "development") {
  if (stubs) {
    api = process.env.STUB_API_URL;
  } else {
    api = process.env.DEVELOPMENT_API_URL;
  }
}

module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: api,
      changeOrigin: true
    })
  );
};
