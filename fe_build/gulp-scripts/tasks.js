/**
 * Created by lizifen on 16/10/14.
 */
var gulp = require('gulp');
var deployConfig = require('../config/deploy.config');
var dirVars = require('../config/dir.config');
var exceptDirs=require('../config/except.config');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var _ = require('lodash');
var fs = require('fs');
var build = require('./build');

var VERSION;
var tasks = {};
var projects=function(){
    var except=exceptDirs;
    var dirArr=fs.readdirSync(dirVars.rootDir);

    return _.difference(dirArr,except);
}();

tasks.collectDists = function (src, dest) {
    src = src || dirVars.distDir;
    dest = dest || dirVars.destDir;

    return gulp.src(src)
        .pipe($.rename((path) =>{
            path.dirname = path.dirname.replace(/dist\//, '');
        }))
        .pipe(gulp.dest(dest));
};

tasks.buildVersion = function (src) {
    src = src || dirVars.versionDir;

    if (!fs.existsSync(src)) {
        fs.writeFileSync(src, JSON.stringify({}));
    }
    return gulp.src(src)
        .pipe($.jsonEditor(function (json) {
            json = json || {};

            var compiled = _.template(deployConfig.cdnLink);
            VERSION = Date.now();

            _.forEach(projects, function (item) {
                json[item] = {};
                json[item].version = VERSION;
                json[item].dev = {
                    "_env": "development",
                    "_root": ""
                }
                json[item].pro = {
                    "_env": "production",
                    "_root": compiled({version: VERSION, project: item})
                }
            })

            return json;
        }))
        .pipe(gulp.dest(dirVars.rootDir));
};

tasks.replaceCdnLink = function () {
    var compiled = _.template(deployConfig.cdnLink);

    return _.forEach(projects, function (item) {
        var src = [`${dirVars.destDir}/${item}/**/*`, `!${dirVars.destDir}/${item}/**/img/*`];
        var dest = `${dirVars.destDir}/${item}/`;

        return gulp.src(src)
            .pipe($.replace(/\.\.\//g, compiled({version: VERSION, project: item})))
            .pipe(gulp.dest(dest));
    })
};

tasks.uploadCdn = function (src) {

    return _.forEach(projects, function (item) {
        src = `${dirVars.destDir}/${item}/**/*`;
        var compiled = _.template(deployConfig.cdnFolder);

        // return gulp.src(src)
        //     .pipe($.upyun.upyunDest(compiled({version: VERSION, project: item}), deployConfig.cdnAccount))
    })
};

module.exports = tasks;