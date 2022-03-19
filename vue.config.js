const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/css/_variables.scss";
          @import "@/css/_mixins.scss";
        `
      },
      css: {
        importLoaders: 1,
        modules: {
          mode: "icss",
        }
      }
    }
  },
  devServer: {
    host: 'localhost'
  }
})
