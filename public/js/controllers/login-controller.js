app.controller('loginController', [ '$scope', 'HTTP','$location','user', function( $scope, HTTP, $location, user ) {
	$scope.form = true
		if (user) {
			$scope.form = false
			if (user.cart) {  	
				HTTP.ajax('GET', '/cart', false).then( response => {
					const date = response[0].date;
					$scope.date = date.split("T")[0];
				})
				$scope.button = false;
				$scope.continue = true;
				$scope.cartExist = true;
			} else {
				$scope.continue = false;
				$scope.button = true;
				$scope.cartExist = false;

			}
		}

	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.allProducts = response.length;
		$scope.someProduct = response[ Math.round( Math.random() * response.length ) -1 ];
	});

	HTTP.ajax('GET', '/order', false).then( response => {
		$scope.allOrders = response.length;
	});

	const loc = location.href;
	const error = loc.split('=')[1];
	if (error == 1) {
		$scope.error = "username or password incorrect";
		console.log($scope.error);
	}
	$scope.submitLogin = () => {
		$scope.error = '';
	};
	$scope.createCart = () => {
		console.log('creating cart from controller')
		HTTP.ajax('PUT', '/cart', '').then( response => {
			return $location.path('/main');
		});
	}
	$scope.continueCart = () => {
		HTTP.ajax('GET', '/cart', false).then( response => {
			return $location.path('/main');
		});
	}
}]);