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
                     theme: setTheme
                },
                templateUrl : 'views/login.html',
                controller  : 'loginCtrl'
            })
            .when('/signup', {
               resolve: {
                     theme: setTheme
                },
                templateUrl :'views/signup.html',
                controller  : 'signupCtrl'
            })
             .when('/universities', {
                 resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl :'views/universities.html',
                controller  : 'universitiesCtrl'
            })
             .when('/addUniversity', {
                 resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl :'views/addUniversity.html',
                controller  : 'universitiesCtrl'
            })
            .when('/profile', {
                resolve: {
                     loggedin: checkLoggedin
                },
                templateUrl : 'views/profile.html',
                controller  : 'profileCtrl'
            })
            .when('/logout', {
                 templateUrl : 'views/process.html',
                controller  : 'logoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });



function checkLoggedin($rootScope, $http, $location) {

      if(!$rootScope.user){

          $http.get('/loggedin').then(function(user){
           if(user.data == "0"){
            if($rootScope.user != undefined){
              delete $rootScope.user;
            }
            $location.path('/login');
           }
           else{
               console.log(user.data);
               $rootScope.user = user.data;
               console.log($rootScope);
           }
        });
      }
}


function setTheme($rootScope, $location){

  
  switch($location.$$path){
      case '/login' :
            $rootScope.theme = 'custom';
            break;
      case '/signup' :
            $rootScope.theme = 'custom2';
            break;
      default:
            $rootScope.theme = 'default';
            break;
  }

}

});


