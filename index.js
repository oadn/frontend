var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config');
var request = require('request');
var session = require('express-session');
var bodyParser = require('body-parser');
var async = require('async');

var sessionMiddleware = session({
    //store: new RedisStore({}), // XXX redis server config
    resave: false,
    saveUninitialized: false,
    secret: "c76f1109b5c6b41c88e40181b733cd2c",
});

app.use(sessionMiddleware);
switch(process.env.NODE_ENV) {
  case "development":
    app.use(function(req, res, next) {
      console.log('tmp '+req.url);
      next();
    });
    app.use(express.static(path.join(__dirname, process.env.FE_TMP_PATH)));
    app.use(function(req, res, next) {
      console.log('src '+req.url);
      next();
    });
    app.use(express.static(path.join(__dirname, process.env.FE_SRC_PATH)));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
    break;
  default:
    console.log('modo no dev');
    app.use(express.static(path.join(__dirname, 'static')));
    break;
}

app.get('/backend', function(req, res, next) {
  res.send('ok');
  console.log(req.session);
});

http.listen(3000);

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', function(socket) {
  var session = socket.request.session;
  Object.observe(session, function(changes) {
    session.save();
  });
  var vUrl = config.backend.url+'/api/'+config.backend.version;
  socket.on('schema', function(schema) {
    var url = vUrl+'/'+schema+'/schema';
    var keyBlackList = ['salt'];
    var attWhiteList = ['enumValues', 'instance', 'validators', 'options', 'defaultValue']
    request.get(url, function(err, httpResponse, body) {
      var form = {};
      async.forEachOf(JSON.parse(body), function(value, key, cb) {
        if(keyBlackList.indexOf(key) !== -1) return cb();
        form[key] = {};
        async.each(attWhiteList, function(att, cb) {
          form[key][att] = value[att];
        }, cb);
      }, function(err) {
        socket.emit('schema:'+schema, form);
      })
    });
  });

})
