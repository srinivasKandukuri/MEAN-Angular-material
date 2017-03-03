// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = require('./db');
//var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE  nodeapp');
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        var sessionUser = { _id: user.id, name: user.name, email: user.email}
        done(null, sessionUser);
    });

    // used to deserialize the user
    passport.deserializeUser(function(sessionUser, done) {
         done(null, sessionUser);
    });

// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
    },
    function(email, password, done) { // callback with email and password from our form
        

         connection.query("SELECT * FROM `userdetails` WHERE `email` = '" + email + "'",function(err,rows){
            if (err)
                return done(err);
             if (!rows.length) {
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            } 
            
            // if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false); // create the loginMessage and save it to session as flashdata
            
            // all is well, return successful user
            
            return done(null, rows[0]);         
        
        });

    }));

};