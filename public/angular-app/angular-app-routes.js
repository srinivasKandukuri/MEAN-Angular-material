'use strict';

angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider, $httpProvider) {
           
        $routeProvider
            
            .when('/',{
                resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl : 'views/index.html'
            })
            .when('/login', {
                resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl : 'views/login.html',
                controller  : 'loginCtrl'
            })
            .when('/signup', {
                templateUrl :'views/signup.html',
                controller  : 'signupCtrl'
            })
            .when('/profile', {
                resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl : 'views/profile.html',
                controller  : 'profileCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });



function checkLoggedin($rootScope, $http, $location) {

      var status=   $http.get('/loggedin').then(function(user){
            
           if(user.data == "0"){
            if($rootScope.user != undefined){
              delete $rootScope.user;
            }
            $location.path('/login');
           }
           if(user.data != "0"){
               console.log(user.data);
               $rootScope.user = user.data;
               console.log($rootScope);
               $location.path('/');
           }
        });
   
}

});


