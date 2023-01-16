// 文件名必须是setupProxy.js，react脚手架会识别。
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      // 遇见 /api 前缀的请求，就会触发该代理配置
      target: 'http://localhost:8080', // 请求转发给谁
      changeOrigin: true, // 控制服务器收到的响应头中Host字段的值
      // pathRewrite: {
      //   '^/api': '', // 重新请求路径
      // },
    })
  );
};
