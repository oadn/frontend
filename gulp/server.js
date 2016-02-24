'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gls = require('gulp-live-server');
var open = require('gulp-open');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

// function browserSyncInit(baseDir, browser) {
//   browser = browser === undefined ? 'default' : browser;
//
//   var routes = null;
//   if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
//     routes = {
//       '/bower_components': 'bower_components'
//     };
//   }
//
//   var server = {
//     baseDir: baseDir,
//     routes: routes
//   };
//
//   /*
//    * You can add a proxy to your backend by uncommenting the line bellow.
//    * You just have to configure a context which will we redirected and the target url.
//    * Example: $http.get('/users') requests will be automatically proxified.
//    *
//    * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
//    */
//   server.middleware = proxyMiddleware('/api', {target: conf.backend.url, proxyHost: 'jsonplaceholder.typicode.com'});
//
//   browserSync.instance = browserSync.init({
//     startPath: '/',
//     server: server,
//     browser: browser
//   });
// }

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch', 'serve:backend'], function () {
  // browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
  var index = path.join(conf.paths.src, '..','index.js');
  var env = {
    NODE_ENV: 'development',
    FE_TMP_PATH: path.join(conf.paths.tmp, '/serve'),
    FE_SRC_PATH: conf.paths.src
  };
  var server = gls(index, {env: env});
  server.start();
  gulp.watch([path.join(conf.paths.src, '**/*')], function(file) {
    console.log('file '+file+' changed');
    server.notify.apply(server, [file]);
  });
  gulp.watch([index], server.start.bind(server));
  gulp.src('').pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('serve:noback', ['watch'], function () {
  // browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
  var index = path.join(conf.paths.src, '..','index.js');
  var env = {
    NODE_ENV: 'development',
    FE_TMP_PATH: path.join(conf.paths.tmp, '/serve'),
    FE_SRC_PATH: conf.paths.src
  };
  var server = gls(index, {env: env});
  server.start();
  gulp.watch([path.join(conf.paths.src, '**/*')], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch([index], server.start.bind(server));
  gulp.src('').pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('serve:backend', ['watch'], function() {
  var index = path.join(conf.backend.path, 'index.js');
  var env = {
    NODE_ENV: 'development'
  };
  var server = gls(index, {env: env}, false);
  server.start();
  gulp.watch([index, path.join(conf.backend.path, 'v*/**/*js')], server.start.bind(server));
});

gulp.task('serve:dist', ['build', 'serve:backend'], function () {
  var index = path.join(conf.paths.dist, 'index.js');
  var env = {
    NODE_ENV: 'development'
  };
  var server = gls(index, {env: env});
  server.start();
  gulp.src('').pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('serve:e2e', ['inject', 'serve:backend'], function () {
  var index = path.join(conf.paths.src, '..','index.js');
  var env = {
    NODE_ENV: 'development',
    FE_TMP_PATH: path.join(conf.paths.tmp, '/serve'),
    FE_SRC_PATH: conf.paths.src
  };
  var server = gls(index, {env: env});
  server.start();
  gulp.watch([path.join(conf.paths.src, '**/*')], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch([index], server.start.bind(server));
  gulp.src('').pipe(open({uri: 'http://localhost:3000'}));
});

gulp.task('serve:e2e-dist', ['build', 'serve:backend'], function () {
  var index = path.join(conf.paths.dist, 'index.js');
  var env = {
    NODE_ENV: 'development'
  };
  var server = gls(index, {env: env});
  server.start();
  gulp.src('').pipe(open({uri: 'http://localhost:3000'}));
});
