
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

	let allProducts = {};
	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.products = response;
		allProducts = $scope.products;
	});

	HTTP.ajax('GET','/category', false).then( response => {
		$scope.categories = response;
	});
	$scope.multiply = event => {
		angular.forEach(allProducts, function(value, key) {
  			if (event.product._id === value._id);
  			console.log(allProducts[0].price, $scope)
  			return $scope.sum = parseInt(allProducts[0].price * $scope.qty);
  			
		});
		
		// if( event.product._id === )
	};
	
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

app.controller('adminController', ['$scope', 'HTTP', function( $scope, HTTP ) {
	$scope.items = [];
	$scope.options = [];
	HTTP.ajax('GET','/category', false).then( response => {
		angular.forEach(response, function(value, key) {
  			$scope.options.push( value );
		});
		console.log($scope.options);
	});
	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.products = response;
		$scope.items.push( response );
	});
	$scope.items = [];
	$scope.submitProducts = () => {
		HTTP.ajax('PUT','/addproduct',$scope.product ).then( response => {
			$scope.items.push( response );
		})
	};

	$scope.addCategory = () => {
		HTTP.ajax('PUT', '/category', $scope.category).then( response => {
			$scope.options.push( response );
		});
	};

}]);


	