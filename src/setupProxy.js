const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://martin-clinic-2.myshopify.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api from the URL
      },
    })
  );
};
