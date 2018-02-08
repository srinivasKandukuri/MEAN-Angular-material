var userUtils = require("../utils/userUtils");




//userController Object 
var userController = function() {};

userController.prototype.login = function(req, res) {

    userUtils.login(req.body, function(err, vals) {
        if (err) return console.log("Error: " + err);
        if (vals) {
            var user = {};
            user.name = vals.Name;
            user._id = vals._id;
            user.status = vals.Active;
            req.session.user = user;
            console.log(req.session);
        }
        res.json({
            status: "OK",
            message: "logged in sucessfully"
        });
    })
};

userController.prototype.getAllUserDetails = function(req, res){
	userUtils.getAllUserDetails(function(err, vals){
		res.jsonp(vals);
	});
};

userController.prototype.getUserDetails = function(req, res){
	userUtils.getUserDetails(req.params.email_id, function(err, vals){
		res.jsonp(vals);
	});
};


userController.prototype.signUp = function(req, res) {
    var userInfo = req.body;
    userUtils.signUp(userInfo, function(err, vals) {
        if (err) {
            res.json({
                status: "error",
                message: "unable to create user"
            });
        } else {
            res.json({
                status: "OK",
                message: "user created sucessfully"
            });
        }
    });
}



userController.prototype.checkIsUserLogged = function(req, res) {
     console.log("=========Session-Start============");
     console.log(req.session);
     console.log("=========Session-End============");
	if(req.session.user){
		res.json(req.session.user);
	}else{
		res.json(0);
	}
};

module.exports =  new userController();