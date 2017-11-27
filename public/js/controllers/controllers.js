
app.controller('indexController', [ '$scope', '$http','$location', function( $scope, $http, $location)  {

	$http.get('/users/session').then( data => {
		if( data.data.passport ) {
		  $scope.username = data.data.passport.user.username;
		  return $scope.logOut = true;
		}
		$scope.username = "guess";
		$scope.login = true;
		$location.path('/');
	});
}]);

app.controller('mainController', [ '$scope', 'HTTP', function( $scope, HTTP ) {
	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.products = response;
	});

	HTTP.ajax('GET','/category', false).then( response => {
		$scope.categories = response;
	});
}]);

app.controller('loginController', [ '$scope', 'HTTP', function( $scope ) {
	const loc = location.href;
	const error = loc.split('=')[1];
	if (error == 1) {
		$scope.error = "username or password incorrect";
	}
	$scope.submitLogin = () => {
		$scope.error = '';
	};
}]);

app.controller('registerController',[ '$scope', function( $scope ) {
	$scope.registerSubmit = () => {
		console.log("register succeed");
	};
}]);

app.controller('productController', ['$scope', 'HTTP', function( $scope, HTTP ) {
	HTTP.ajax('GET','/category', false).then( response => {
		$scope.categories = response;
	});

	$scope.submitProducts = () => {
		HTTP.ajax('POST','/add-product',$scope.product );
	};


}]);


	