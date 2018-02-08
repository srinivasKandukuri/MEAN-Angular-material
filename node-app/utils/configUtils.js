var fs = require('fs');
var path = require('path');

var ConfigService = function(){};

ConfigService.prototype.getConfigValue = function() {
	// body...
};


ConfigService.prototype.readConfigFile = function(filename){
	
	var fileUrl = path.join(__dirname, '../../');
		fileUrl = fileUrl+'node-app/node-config/'+filename;
		//fileUrl = JSON.parse(JSON.stringify(fileUrl));

	   var obj =  fs.readFile(fileUrl, 'utf8', function (err, data) {
		    if (err) throw err; // we'll not consider error handling for now
		    	//console.log(data);
		    	return JSON.parse(data);
		});

	return obj;
};


module.exports = new ConfigService();