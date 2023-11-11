const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    proxy.createProxyMiddleware({
      target: "https://api.vworld.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
