/**
 * Created by lizifen on 16/8/29.
 */
var gulp = require('gulp');
var config = require('../config/build.config');
var minimist = require('minimist');
var _ = require('lodash');

var build = function () {
    if (options.dir) {
        var build_path = config[options.dir].build_path;

        var build = require(build_path);

        return build;
    } else {
        return _.forEach(config, function (value, key) {
            var build_path = config[key].build_path;

            var build = require(build_path);

            return build;
        })
    }
}

var knownOptions = {
    string: ['env','dir'],
    default: {env: process.env.NODE_ENV || 'development',dir:''}
};

var options = minimist(process.argv.slice(2), knownOptions);

module.exports = build;