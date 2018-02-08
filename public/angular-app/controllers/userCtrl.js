angular.module('userCtrl', [])

.controller('loginCtrl',function($scope, $location, $rootScope, Auth){
	//check userLoggedin or not
	Auth.checkUserLoggedIn();

	$scope.submit = function(){
		Auth.login($scope.userInfo).then(function(response){
			$location.url("/profile");
		});
	}
})

.controller('signupCtrl',['$rootScope','$scope', '$mdToast','Auth', function($rootScope, $scope, $mdToast, Auth){

	$scope.message = '';
	
	$scope.submit = function(){
		Auth.signup($scope.userInfo).then(function(response){
			if(response.status == 200 && response.data.status == 'OK'){
				$scope.message = response.data.message;
				$scope.showToast();
				$scope.userInfo = {};
				$scope.regForm.$setPristine();
    			$scope.regForm.$setUntouched();
			}else{
				$scope.errorMessage = response.message
			}
		});
	};

	$scope.showToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .textContent($scope.message)                    
                .hideDelay(5000)
            );
    };

}])

.controller('universitiesCtrl', ['$scope', function($scope){
	
}])





.controller('logoutCtrl',function($scope, $location, $rootScope, Auth){
	
	$scope.submit = function(){
		Auth.logout($scope.userInfo).then(function(response){
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

