var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var lessMiddleware = require('less-middleware');

var index = require('./routes/index');
var member = require('./routes/member');
var department = require('./routes/department');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: true }));
// app.use(cookieParser());
// app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
// const router = express.Router();

app.use('/', index);
app.use('/member', member);
app.use('/department', department);

/////////////////////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log('error at app.js for all routes');
});

// app.listen(8080, function () {
//   console.log("Server started on url: localhost:8080");
// });

app.listen(8080);

module.exports = app;
