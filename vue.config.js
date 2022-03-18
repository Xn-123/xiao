const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // productionSourceMap:false,
  transpileDependencies: true,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 代理（解决跨域问题）
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
