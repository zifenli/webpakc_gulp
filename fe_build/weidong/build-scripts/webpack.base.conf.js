var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    coachOrderListApp: path.resolve(__dirname, '../src/entries/coach_order_list_main.js'),
    gymsOrderListApp:path.resolve(__dirname, '../src/entries/gyms_order_list_main.js'),
    privateScheduleOrderApp:path.resolve(__dirname,'../src/entries/private_schedule_order_main.js'),
    groupScheduleOrderApp:path.resolve(__dirname,'../src/entries/group_schedule_order_main.js')
  },
  output: {
    path: config.build.assetsRoot,
    //发布和本地build
    publicPath: process.env.NODE_ENV === 'development' ? config.build.assetsPublicPath : config.deploy.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [require('postcss-pxtorem')({
      rootValue: 12,
      unitPrecision: 5,
      propWhiteList: [
        'font', 'font-size', 'line-height', 'letter-spacing', 'min-height',
        'height', 'width', 'max-width', 'padding', 'margin',
        'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'left', 'right', 'top', 'bottom', 'max-height'],
      selectorBlackList: [/^html$/],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    })]
  }
}
