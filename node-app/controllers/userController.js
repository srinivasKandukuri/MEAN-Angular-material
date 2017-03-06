var userModel = require("../models/userModel");




//userController Object 
var userController = function() {};

userController.prototype.login = function(req, res) {
	 
	userModel.checkUserLogin(req.body.email, req.body.password, function(err, vals){
		if (err) return console.log("Error: " + err);
		console.log(vals);
        res.jsonp(vals);
	});

};

userController.prototype.getUserDetails = function(req, res){
	userModel.getUserDetails(function(err, vals){
		res.json(vals);
	});
};


module.exports =  new userController();