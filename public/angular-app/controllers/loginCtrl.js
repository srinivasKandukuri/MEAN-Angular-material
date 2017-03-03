angular.module('mainCtrl', [])

.controller('loginCtrl', function($scope,$location, Auth){

	$scope.submit = function(form){

		if (form.$invalid) {
    		return;
  		}
  		
		var promise = Auth.login($scope.email, $scope.pass);
		promise.then(function(response){
			$location.url("/profile");
		});
	}
})

.controller('profileCtrl',function($rootScope,$scope,$location){
		if($rootScope.user){


			$scope.name = $rootScope.user.name;
			}
		console.log($scope.name);
});

