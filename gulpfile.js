var gulp = require('gulp'),
mocha = require('gulp-istanbul'),
mocha = require('gulp-mocha'),
istanbul = require('gulp-istanbul');

gulp.task('pre-test', function(){
  return gulp.src(['api.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['test/*.js'], {read:false})
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: {
          statements : 95,
          branches : 70,
          lines : 95,
          functions : 100
    } }));
});


gulp.task('default', function(){
    gulp.run('test');
});
