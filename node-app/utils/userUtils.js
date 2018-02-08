var configUtils = require('./configUtils');
var userModel = require('../models/user');



/**
 * PACKAGE : @userUtils
 * AUTHOR  : @Srinivas Kankdukuri
 * 
 * @All User Related Models here
 *
 * @return {[json]}
 */

var userUtils = function() {};


userUtils.prototype.login = function(user, callback) {
    console.log(user);
    var query = userModel.user.findOne({
        "ContactInfo.Email": user.email
    });

    query.exec(function(err, result) {
        if (err) return console.log(err);
        if (result == null) {
            return callback(null, {
                status: 'OK',
                message: 'no user found'
            });
        } else if (result != '' && result.Password != user.password) {
            return callback(null, {
                status: "OK",
                message: 'Wrong Password'
            });
        } else if (result != '' && result.Active.IsActive) {
            callback(null, result);
        }
    })
};

userUtils.prototype.getAllUserDetails = function(callback) {
    var query = User.find().select('email password');
    this.processQuery(query, callback);
};

userUtils.prototype.getUserDetails = function(email, callback) {
    var query = userModel.user.findOne({
        email: email
    }).select('email password');
    this.processQuery(query, callback);
};



/**
 * [signUp data save in db]
 *
 * Saving basic details in user collection
 * Saving userRoles in userRoles collection
 *
 * Ref 'user' as user_ids in userRoles collection
 * 
 * @param  {[type]}   user     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
userUtils.prototype.signUp = function(user, callback){

    var userObj = new userModel.user({
        Name: {
            firstName: user.firstName,
            lastName: user.lastName
        },
        ContactInfo: {
            PhoneNumber: user.phoneNumber,
            Email: user.email
        },
        Password: user.password
    });
  
    userObj.save(function(err, res) {
        if (err) return handleError(err);

        if (user.userType != undefined) {
            userModel.userRoles.findOne({
                UserRolesName: user.userType
            }).exec(function(err, result) {
                if (err) return handleError(err);

                //if no roles match create new role
                //if match add user id to role
                if (result == null) {
                    result = userModel.userRoles({
                        User_ids: res._id,
                        UserRolesName: user.userType
                    });
                } else {
                    result.User_ids.push(res._id);
                }
                result.save(function(err, response) {
                    if (err) return handleError(err);
                    if (res) return callback(null, res);
                });
            })
        }
    });
}



userUtils.prototype.processQuery = function(query, callback) {
    query.exec(function(err, res) {
        if (err) return handleError(err);
        if (res) {
            callback(null, res);
        }
    });
};
/**
 * exporting userUtils
 * @type {userUtils}
 */
module.exports = new userUtils();