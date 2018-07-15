const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@Api': path.resolve(__dirname, 'src/api'),
        '@Models': path.resolve(__dirname, 'src/models'),
        '@Controls': path.resolve(__dirname, 'src/components/controls'),
        '@Layouts': path.resolve(__dirname, 'src/components/layouts'),
        '@Pages': path.resolve(__dirname, 'src/components/pages'),
        '@Plugins': path.resolve(__dirname, 'src/plugins'),
        '@Router': path.resolve(__dirname, 'src/router'),
        '@Store': path.resolve(__dirname, 'src/store'),
        '@Utils': path.resolve(__dirname, 'src/utils')
      }
    }
  }
}
