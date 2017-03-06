angular.module('ajaxServices', [])


.factory('Ajax', function($http, $q, $window) {


	var ajaxFactory = {};

	var config = [{
        alias: 'LOGIN',
        api: '/api/login',
        method: 'post'
    },{
    	alias: 'LOGOUT',
        api: '/api/logout'
    },{
        alias: 'SIGNUP',
        api: '/api/signup',
        method: 'post'
    }];
	
	ajaxFactory.buildParams = function(api) {
        for (var i = 0; i < config.length; i += 1) {
            if (config[i].alias === api) {
                return config[i];
            }
        }
        return undefined;
    }

    ajaxFactory.makeCall = function(api,postData = null){
    	var params = this.buildParams(api);
        var data   = postData;

    	if(params != undefined){
    		if(params.method == undefined){
    			return $http.get(params.api);
    		}else if(params.method == 'post'){
    			return $http.post(params.api, data);
    		}else{
                //all other methods here
            }
    	}

        return undefined;
    }


    ajaxFactory.unsplash = function(){
        var clientId = 'XXXXXXXXXXXXXXXXXXXXXXX';
        return $http.get('https://api.unsplash.com//photos/random?client_id='+clientId);
    }

	return ajaxFactory;
})
