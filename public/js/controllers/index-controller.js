app.controller('indexController', [ '$scope', 'HTTP', '$location', 'userSRV', function( $scope, HTTP, $location, userSRV)  {
	userSRV.getUser().then(
			user => {
				$scope.username = user.fname;
		  		$scope.logOut = true;
			},
			() => {
				$scope.username = "guess";
				$scope.login = true;
			}
		)
}]);