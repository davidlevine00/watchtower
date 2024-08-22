const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/admin/api/2024-07/graphql.json',
      },
    })
  );
};
