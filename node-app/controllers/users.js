var user = require("../models/userModel");
exports.render = function(req, res){
    user.getAll(function (err, vals) {
        if (err) return console.log("Error: " + err);
        console.log(vals);
        res.jsonp(vals);
    });
};
