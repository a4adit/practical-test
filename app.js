var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ErrorMessage = require('./util/ErrorMessage');
var store = require('./routes/store');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/store', store);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.code = "ST0001";
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  var errorCode = err.code || "ST0000";
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error message
  var message = ErrorMessage.getMessage(errorCode);
  var errMsg = {
  	code : errorCode,
  	message : message
  }
  res.status(err.status || 500);
  res.send({error:errMsg});
});

module.exports = app;
