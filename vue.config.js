const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  // baseUrl: BASE_URL,
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('_c', resolve('src/components'));
      
    
  },
  css: {
    modules: false, // 启用 CSS modules
    extract: true, // 是否使用css分离插件
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {} // css预设器配置项
  },
  devServer: {
    port: 8080, // 端口
    proxy: 'http://once.byb.world/' // 设置代理
  }
}