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

  app.use(
    "/n_api",
    proxy.createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/n_api": "",
      },
    })
  );
};
