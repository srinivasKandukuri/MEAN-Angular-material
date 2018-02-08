// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs 			       = require("fs");
var session  	     = require('express-session');
var cookieParser   = require('cookie-parser');
var passport 	     = require('passport');
var mongoose       = require('mongoose');
var router         = express.Router();

// Mongoose Connection ======================================
var uri = 'mongodb://localhost:27017/test';
var options = {
    user: '',
    pass: ''
};
mongoose.connect(uri, options, function(err) {
    if (err) throw err;
    console.log('success');
});


// initialize express session here
app.use(cookieParser()); 
app.use(session({
  secret: 'secretKeyHere',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
  cookie: { maxAge: 6000000 }
}));


// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req.path);    
    next();
});
app.use(router);

// routes ==================================================
require('./node-app/routes')(app); // configure our routes

// startup our app at http://localhost:8081
// set our port
var port = process.env.PORT || 8081; 

app.listen(port);               

// shoutout to the user                     
console.log('Express server listening on port http://192.168.33.10:'+ port);

// expose app           
exports = module.exports = app;   