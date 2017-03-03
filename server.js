// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs 			   = require("fs");
var mysql      	   = require('mysql');
var session  = require('express-session');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash    = require('connect-flash');
// configuration ===========================================
    
// config files
var db = require('./config/db');
// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); 

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// set our port
var port = process.env.PORT || 8080; 

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


// create our router
var router = express.Router();

app.use('/api', router);
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req.path);    
    next();
});
app.use(router);


// routes ==================================================
require('./node-app/routes')(app, router, passport); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Express server listening on port http://192.168.33.10:'+ port);

// expose app           
exports = module.exports = app;   