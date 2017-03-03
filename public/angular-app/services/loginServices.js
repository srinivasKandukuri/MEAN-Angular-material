angular.module('loginServices', [])


.factory('Auth', function($http, $q, $window) {


	var authFactory = {};
	
	authFactory.login = function(username, password) {

		var data = { email:username, password:password }
		var promise  = $http.post('/api/login', data);
		return promise;
	}

	authFactory.logout = function() {
		var promise  = $http.get('/api/logout');
		return promise;
	}
	
	return authFactory;

})
