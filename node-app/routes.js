// sample api route
var db = require('../config/db');
var users = require('./controllers/users');
var LoginServices = require('./controllers/loginServices');



module.exports = function(app, api, passport) {



    api.get('/', function(req, res){
        res.render('index', { title: 'Node-app' });
    });
    
    api.get('/api/users', users.render);

    api.get('/api/logout', function(req,res){
        req.session.destroy(function (err) {
          return res.json(200, {
                    message: "logged out user"
          });
        });
    });
    
    app.post('/api/login',function handleLocalAuthentication(req, res, next){

        console.log(req.session.passport.user);
        passport.authenticate('local-login',function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.json(200, {
                    message: "no user found"
                });
            }
            // Manually establish the session...
            req.login(user, function(err) {
                if (err) return next(err);
                return res.json({
                    message: 'user authenticated',
                });
            });
        })(req, res, next);
    });

    app.get('/loggedin', function(req,res){
         sendUserInfromation(req, res);
    })
};


// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


var sendUserInfromation = function(req, res) {
      if ( req.isAuthenticated() ) {
          res.send(req.user);
      }
      else {
          res.send('0');
      }
  }