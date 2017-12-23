
app.controller('indexController', [ '$scope', 'HTTP', '$location', function( $scope, HTTP, $location)  {

	HTTP.ajax('GET', '/users/session', false).then( response => {
		if( response.passport ) {
		  $scope.username = response.passport.user.fname;
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
	$scope.addItemToCart = item => {
		const cartItems = {};
		const id = item._id;
		const name = item.name;
		const image = item.image;
		const quantity = item.qty;
		const price = item.price;
		cartItems.name = name;
		cartItems.image = image;
		cartItems.quantity = quantity;
		cartItems.price = price;

		HTTP.ajax( 'PATCH', '/cart/' + cartId + '/items', cartItems ).then( response => {
		});
	};
	$scope.removeItemFromCart = () => {
		HTTP.ajax( 'PATCH', '/cart/' + cartId + '/items', "" ).then( response => {
			console.log(response);
		});
	}
	setTimeout(() => { let cartId }, 50);

	HTTP.ajax('GET', '/cart', false).then( response => {
		cartId = response[0]._id;
	});

	setTimeout(() =>{ HTTP.ajax('GET', '/cart/'+ cartId + '/items', false).then( response => {
		$scope.cartItems = [];
		angular.forEach(response, (value, key) => {
			angular.forEach(value.items, (item, key) => {
				$scope.cartItems.push(item);						
			})
		})
		$scope.sum = 0;
		var sum = 0;
		for(let i = 0 ; i < $scope.cartItems.length ; i++){
			let price = $scope.cartItems[i].price;
			let quantity = $scope.cartItems[i].quantity;
			sum += price*quantity;
			$scope.sum = sum.toFixed(2);
		}
		
	})},70)
}]);

app.controller('loginController', [ '$scope', 'HTTP','$location', function( $scope, HTTP, $location ) {
	
	HTTP.ajax('GET', 'users/session', false).then(response => {
		const id = response.passport.user._id;
		$scope.userId = { userId: id }
	});	
	setTimeout(() => {

		HTTP.ajax('GET', '/cart', false).then( response => {
			const checkIfExist = response[0]._id;
			if(checkIfExist !== id) {
				$scope.continue = false;
				$scope.button = true;
			}
			else if(checkIfExist === id) {
				$scope.button = false;
				$scope.continue = true;
			}
			else if($scope.form){
				$scope.continue = false;
				$scope.button = false;
			}
		});
	},70)
	
	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.allProducts = response.length;
		$scope.someProduct = response[ Math.round( Math.random() * response.length ) -1 ];
	});
	HTTP.ajax('GET', '/users/session', false ).then( response => {
		if(response.passport) {
			$scope.button = true;
		}
		else if(!response.passport) {
			$scope.form = true;
		}
	});
	const loc = location.href;
	const error = loc.split('=')[1];
	if (error == 1) {
		$scope.error = "username or password incorrect";
		console.log($scope.error);
	}
	$scope.cartUser = '';
	$scope.submitLogin = () => {
		$scope.error = '';
	};
	$scope.createCart = () => {
		console.log($scope.userId)
		;HTTP.ajax('PUT', '/cart', $scope.userId).then( response => {
			return $location.path('/main');
		})
	}
	$scope.continueCart = () => {
		HTTP.ajax('GET', '/cart/'+ $scope.id, $scope.cartUser).then( response => {
			console.log(response);
		return $location.path('/main');
	
	});
	}
}]);

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

app.controller('adminController', ['$scope', 'HTTP', function( $scope, HTTP ) {
	$scope.items = [];
	$scope.options = [];
	HTTP.ajax('GET','/category', false).then( response => {
		angular.forEach(response, (value, key) => {
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


	