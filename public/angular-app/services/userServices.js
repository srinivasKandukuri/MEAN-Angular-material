angular.module('userServices', [])

.factory('Auth', function($http, $q, $window, $rootScope, $location, Ajax) {

	var authFactory = {};
	var data = null;

	authFactory.login = function(data) {
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

	authFactory.checkUserLoggedIn = function(){
			if($rootScope.user != undefined){
				$location.url("/");
			}
	}
	
	return authFactory;

})

