app.controller('registerController',[ '$scope', 'HTTP', '$location', function( $scope, HTTP, $location ) {
	$scope.continue = () => {
		$scope.errors = [];
		HTTP.ajax('POST','/users/register', $scope.user ).then( response => {
			angular.forEach(response, (value, key) => {
				console.log(value);
				for ( let i = 0 ; i < value.length ; i++) {
					if (value[i].param === "id" || value[i].param === "email" || value[i].param === "password" || value[i].param === "password2" )
					$scope.errors.push(value[i].msg);
				}
			});
			if ($scope.errors.length == 0) {
				$scope.step2 = true;
				$scope.step1 = true;
			}
		})	
	};
	$scope.registerSubmit = () => {
		$scope.errors = [];
		HTTP.ajax('POST','/users/register', $scope.user ).then( response => {
			angular.forEach(response, ( value, key ) => {
				console.log(value);
				for ( let i = 0 ; i < value.length ; i++ ) {
					if ( value[i].param === "city" || value[i].param === "street" || value[i].param === "fname" || value[i].param === "lname" )
					$scope.errors.push(value[i].msg);
				}
			});
			return $location.path('/');
		});	
	};
}]);