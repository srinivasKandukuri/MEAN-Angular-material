// sample api route
var db = require('../../config/db');
var configUtils =  require('./configUtils');



var userModel = function(){
  var query = configUtils.readConfigFile('query_config');
};

userModel.prototype.checkUserLogin = function(email,pass, callback) {
  var query = configUtils.readConfigFile('query_config');
	var sql = "select * from userdetails where email='ksrinivas.cse@gmail.com'";
	return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          callback(null, results);
    });	
};


userModel.prototype.getUserDetails = function(callback){
	var sql = "SELECT * from userdetails";  
	return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          //console.log(results);
          callback(null, results);
    });	
};


module.exports = new userModel();