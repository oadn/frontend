var gulp = require('gulp');
var wiredep = require('gulp-wiredep');
var browser = require('browser-sync').create();
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var request = require('request');
var config = require('./config');
var nodemon = require('gulp-nodemon');
var fileSort = require('gulp-angular-filesort');

var reload = browser.reload;

gulp.task('default', ['bower', 'inject']);

function temp() {
  return gulp.src('./src/index.html').pipe(gulp.dest('.tmp/'));
}

function injectTask() {
  var target = temp();
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css', '!./src/**/*spec.js', '!./src/**/*mock.js']).pipe(fileSort());

  return target.pipe(inject(sources, {relative: true, ignorePath: '../src'}))
    .pipe(gulp.dest('./src'));
}

gulp.task('inject', injectTask);

gulp.task('bower', function bowerTask() {
  temp()
    .pipe(wiredep({ignorePath: '..', onError: function(err) { console.log(err)}, onPathInjected: function(path) {console.log(path)}}))
    .pipe(gulp.dest('src'));
});

gulp.task('sass', function sassTask() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles'));
});

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('bkmon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: '../backend-db/index.js',

    // watch core server file(s) that require server restart on change
    watch: ['../backend-db/index.js', '../backend-db/v*/**/*js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browser.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});


gulp.task('nodemon', ['bkmon'], function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'index.js',

    // watch core server file(s) that require server restart on change
    watch: ['index.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browser.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('serve', ['bower', 'inject', 'nodemon'], function serveTask() {
  browser.init({
    proxy: 'http://localhost:'+config.port
  });
  gulp.watch(['styles/**/*.scss'], ['sass']);
  watch(['./src/**/*.js', './src/**/*.css'], {events: ['add']}, injectTask);
  gulp.watch('./bower.json', ['bower']);
  gulp.watch(['**/*.html', '**/*.css', '**/*.js'], {cwd: 'src'}, reload);
});
