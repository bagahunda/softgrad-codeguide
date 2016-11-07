const gulp = require('gulp');
const jadeJade = require('jade');
const $    = require('gulp-load-plugins')();

const data = {
  jv0: 'jacascript:void(0);',
  timestamp: +Date.now()
};

jadeJade.filters.code = function (block) {
  return block
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/#/g, '&#35;')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '&#010;');
};

module.exports = function(options) {
  return function() {
    return gulp
      .src(options.src)
      .pipe($.jade({
        data: data,
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
  };
};
