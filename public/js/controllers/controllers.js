
app.controller('indexController', [ '$scope', '$http', function( $scope, $http )  {

	$http.get('/users/session').then( data => {
		if( data.data.passport ) {
		  $scope.username = data.data.passport.user.username;
		  return $scope.logOut = true;
		}
		$scope.username = "guess";
		$scope.login = true;
	});
}]);

app.controller('mainController', [ '$scope', '$http', function( $scope, $http ) {
	$http.get('/getAll').then( data => {
		$scope.products = data.data;
	});
	$http.get('/category').then( response => {
			$scope.categories = response.data;
		
	})
}]);

app.controller('loginController', [ '$scope', '$http', function( $scope, $http ) {
	const loc = location.href;
			const error = loc.split('=')[1];
			if (error == 1) {
				$scope.error = "username or password incorrect";
				}
	$scope.submitLogin = () => {
		$scope.error = '';
		$http.post('/users/login', $scope.user).then( response => {
			});
			
			
		
	};
}]);

app.controller('registerController',[ '$scope', '$http', function( $scope, $http ) {
	$scope.submitLogin = () => {
		$http.post('/users/register', $scope.user).then( response => {
			console.log(response.data);
		});
	};
}]);

	