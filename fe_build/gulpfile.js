/**
 * Created by lizifen on 16/8/22.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var buildScript=require('./gulp-scripts/build');
var tasks = require('./gulp-scripts/tasks');


gulp.task('collectDists', function () {
    return tasks.collectDists();
});

gulp.task('buildVersion', function () {
    return tasks.buildVersion();
});

gulp.task('replaceCdnLink', function () {
    return tasks.replaceCdnLink();
});

gulp.task('uploadCdn', function () {
    return tasks.uploadCdn();
});

gulp.task('build', buildScript);

gulp.task('publish', function () {
    runSequence(
        'collectDists',
        'buildVersion',
        'replaceCdnLink',
        'uploadCdn'
    )
});

