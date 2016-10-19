/**
 * Created by lizifen on 16/10/14.
 */
var path = require('path');
var moduleExports = {};

moduleExports.rootDir=path.resolve(__dirname, '../');
moduleExports.distDir = [
    `${moduleExports.rootDir}/**/dist/**/*`,
    `!${moduleExports.rootDir}/**/dist/*`,
    `!${moduleExports.rootDir}/node_modules/**/**/*`,
    `!${moduleExports.rootDir}/static/**/**/*`];
moduleExports.destDir = path.resolve(moduleExports.rootDir,'./static/');
moduleExports.versionDir = path.resolve(moduleExports.rootDir,'./version.json');

module.exports = moduleExports;