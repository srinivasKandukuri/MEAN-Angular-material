angular.module('userServices', [])

.factory('Auth', function($http, $q, $window, Ajax) {

	var authFactory = {};
	var data = null;

	authFactory.login = function(username, password) {
		data = {email:username, password:password}
		return this.call('LOGIN', data);
	}

	authFactory.logout = function() {
		return this.call('LOGOUT');
	}

	authFactory.signup = function(data){
		return this.call('SIGNUP', data);
	}

	authFactory.call = function(service,data){
		return Ajax.makeCall(service, data);
	}
	
	return authFactory;

})

