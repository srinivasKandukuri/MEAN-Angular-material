var userController = require('./controllers/userController');


module.exports = function(app) {

    app.get('/', function(req, res){
        res.render('index', { title: 'LOAT' });
    });

    // Sample API calls==============================================
    app.post('/api/login', userController.login);
    app.get('/api/users', userController.getAllUserDetails);
    app.get('/api/users/:email_id', userController.getUserDetails);


    app.post('/api/signup', userController.signUp);




    // Internal Calls==================================================
    app.get('/loggedin', userController.checkIsUserLogged);
};
