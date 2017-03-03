var login = require("../models/loginModel");

var LoginServices = function() {};

LoginServices.prototype.login = function(req, res) {
	 
	login.checkUserLogin(req.body.email, req.body.password, function(err, vals){
		if (err) return console.log("Error: " + err);
		console.log(vals);
        res.jsonp(vals);
	});
};


module.exports =  new LoginServices();