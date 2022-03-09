var createError = require('http-errors');
var express = require('express');
const socket=require("socket.io");
var logger = require('morgan');
var path = require('path');

const http=require('http');

const hostname="localhost";
const port=3000;

var indexRouter = require('./routes/index');
var roomRouter = require('./routes/roomRouter');

const mongoose=require('mongoose');
const url="mongodb://localhost:27017/rtc";




const connect=mongoose.connect(url);

connect.then((db)=>{
	console.log("Connected correctly to the server");
})
.catch((err)=>{
  console.log(err);
})

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/rooms',roomRouter);

app.use('/',indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{message:err.message,status:err.status,stack:err.stack});
});


const server=http.createServer(app);

const io = socket(server);
require('./socket')(io);

server.listen(port,hostname,()=>{
	console.log(`Server running at http://${hostname}:${port}/`);
});
