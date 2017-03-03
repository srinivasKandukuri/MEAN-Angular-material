var db = require('../../config/db');

function checkUserLogin(email,pass, callback){
	var sql = "select * from userdetails where email='ksrinivas.cse@gmail.com'";
	return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          callback(null, results);
    });	
}

module.exports.checkUserLogin = checkUserLogin;