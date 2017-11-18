
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

app.controller('mainController', [ '$scope', 'HTTP', function( $scope, HTTP ) {
	const successHandler = res => {
		$scope.products = res.data;
    }
    const failureHandler = res => {
		$scope.products = "no products are avaliable";
    }
	HTTP.ajax('GET', '/getAll', false, successHandler, failureHandler);

	const successHandler2 = res => {
		$scope.categories = res.data;
    }
    const failureHandler2 = res => {
		$scope.products = "no categories are avaliable";
    }
	HTTP.ajax('GET','/category', false, successHandler2, failureHandler2 );
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
	const successHandler2 = res => {
		$scope.categories = res.data;
    }
    const failureHandler2 = res => {
		$scope.products = "no categories are avaliable";
    }
	HTTP.ajax('GET','/category', false, successHandler2, failureHandler2 );

	$scope.submitProducts = () => {
		HTTP.ajax('POST','/add-product',$scope.product, false, false );
	};
}]);

	