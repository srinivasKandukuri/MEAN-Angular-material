angular.module('userCtrl', [])

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

.controller('signupCtrl',function($scope, Auth){
	
	$scope.submit = function(regForm){
		Auth.signup($scope.userInfo).then(function(response){
			if(response.status == 'OK'){
				$scope.message = 'User Successfully registered';
			}else{
				$scope.errorMessage ='Unable to process your request, please try again later'; 
			}
		})
	}

})









.controller('profileCtrl',function($rootScope,$scope,$location){

		if($rootScope.user){
			$scope.name = $rootScope.user.name;
		}
		
		console.log($scope.name);
});

