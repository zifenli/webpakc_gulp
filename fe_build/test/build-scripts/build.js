// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = process.argv.slice(2)[2] || "production";

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsRoot = env.NODE_ENV == 'production' ? config.build.assetsRoot : config.deploy.assetsRoot;
var assetsSubDirectory = env.NODE_ENV == 'production' ? config.build.assetsSubDirectory : config.deploy.assetsSubDirectory;
var assetsPath = path.join(assetsRoot, assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
