// sample api route
var db = require('../../config/db');

module.exports.getAll = function(callback) {
	var sql = "SELECT * from userdetails";
	return db.query(sql, function (error, results, fields) {
          if (error) throw error;
          //console.log(results);
          callback(null, results);
    });	
};