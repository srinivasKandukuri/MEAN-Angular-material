var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({

	Name: {
		firstName: String,
		middleName: { type: String, trim: true},
		lastName: { type: String, trim: true }
	},
	ContactInfo: {
		PhoneNumber: { type: Number },
		Email: String,
		Gender: String
	},
	Address: {
		Address: String,
		Country: String,
		City: String
	},
	Active: {
		IsActive: { type: Boolean, default: true },
		IsEmailActive: { type: Boolean, default: false },
		isPhoneNumberActive: { type: Boolean, default: false }
	},
	Created_at : { type: Date, default: Date.now },
	Updated_at : { type: Date, default: Date.now },
	Password: { type: String, required: true }
});


var UserRolesSchema = new Schema({

	User_ids:[
      {type: Schema.Types.ObjectId, ref: 'user'}
    ],
	UserRolesName: String,
	UserRolesDescription: String

});




module.exports.user = mongoose.model('user', UserSchema);
module.exports.userRoles = mongoose.model('userRoles', UserRolesSchema);