'use strict'

const gulp = require('gulp');

function requireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}

requireTask('styles:dev', './tasks/styles-dev', {
  src: './src/assets/styles/main.styl'
});

requireTask('styles:prod', './tasks/styles-prod', {
  src: './src/assets/styles/main.styl'
});

requireTask('svg', './tasks/svg', {
  src: './src/assets/images/svg/**/*.svg',
  dist: './src/templates/blocks/sprite/'
});

requireTask('scripts:dev', './tasks/scripts-dev', {
  src: ['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js']
});

requireTask('scripts:prod', './tasks/scripts-prod', {
  src: ['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js']
});

requireTask('templates:dev', './tasks/templates-dev', {
  src: './src/templates/**/*.jade'
});

requireTask('templates:prod', './tasks/templates-prod', {
  src: './src/templates/pages/*.jade'
});

requireTask('images', './tasks/images', {
  src: './src/assets/images/*.{png,jpg}'
});

requireTask('fonts', './tasks/fonts', {
  src: './src/assets/fonts/**/*'
});

requireTask('zip', './tasks/zip', {
  dist: './dist/builds'
});

requireTask('clean', './tasks/clean', {
  dist: './dist'
});

requireTask('serve', './tasks/serve', {
  src: './dist'
});

requireTask('validate', './tasks/validate', {
  src: './dist/*.html'
});

gulp.task('watch', function() {
  gulp.watch(['./src/assets/styles/*.styl', './src/templates/blocks/**/*.styl'], gulp.series('styles:dev'));
  gulp.watch(['./src/assets/scripts/*.js', './src/templates/blocks/**/*.js'], gulp.series('scripts:dev'));
  gulp.watch('./src/templates/**/*.jade', gulp.series('templates:dev'));
  gulp.watch('./src/assets/images/svg/*.svg', gulp.series('svg'));
  gulp.watch('./src/assets/images/*.{png,jpg}', gulp.series('images'));
  gulp.watch('./src/assets/fonts/**/*', gulp.series('fonts'));
})

gulp.task('build:dev', gulp.series(
  'clean',
  gulp.parallel('styles:dev', 'scripts:dev', 'templates:dev', 'svg', 'images', 'fonts'))
);

gulp.task('dev', gulp.series(
  'build:dev', gulp.parallel('watch', 'serve'))
);

gulp.task('build:prod', gulp.series(
  'clean',
  gulp.parallel('styles:prod', 'scripts:prod', 'templates:prod', 'svg', 'images', 'fonts'))
);

gulp.task('prod', gulp.series(
  'build:prod', 'zip')
);

