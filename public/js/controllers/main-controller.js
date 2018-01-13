app.controller('mainController', [ '$scope', 'HTTP', 'userSRV', 'user', 'cartSRV', '$location', function( $scope, HTTP, userSRV, user, cartSRV, $location ) {
	
	

	if( user )	{
		cartSRV.getCartItems().then(
			cart => {
				$scope.items = cart.items
				$scope.total = cart.total
			}
		)
	};

	$scope.multiply = (itemIndex) => {
		let originalPrice;
		for( let i = 0 ;  i < $scope.products.length ; i++) {
			if($scope.products[i]._id === $scope.items[itemIndex]._id){

				originalPrice = $scope.products[i].price;
			}
		}
		$scope.items[itemIndex].price = originalPrice * $scope.items[itemIndex].quantity;
	}

	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.products = response;
	});
	
	HTTP.ajax('GET','/category', false).then( response => {
		$scope.categories = response;
	});
	$scope.addItemToCart = item => {
		const items = {};
		const id = item._id;
		const name = item.name;
		const image = item.image;
		const quantity = item.qty;
		const multiply = item.price * quantity;
		items._id = item._id;
		items.name = name;
		items.image = image;
		items.quantity = quantity;
		items.price = multiply;
		HTTP.ajax( 'PATCH', '/cart/items', items ).then( response => {
			HTTP.ajax('GET', '/cart/items', false).then( response => {
				for( let i = 0 ; i < response[0].items.length ; i++ ) {
					response[0].items[i].price = JSON.parse(response[0].items[i].price)
					$scope.items = response[0].items;
				}
				var sum = 0;
				for(let i = 0 ; i < $scope.items.length ; i++){
					let price = $scope.items[i].price;
					let parsePrice = JSON.parse(price);
					sum += parsePrice;
					let fixedSum = sum.toFixed(2);
					$scope.sum = fixedSum;
				};
				console.log($scope.items);
				
			});
		});
	};

	$scope.removeItemFromCart = item => {
		const itemBody = {
			_id: item._id,
			name: item.name,
			image: item.image,
			quantity: item.quantity,
			price: item.price
		 };
		 console.log(itemBody)
		HTTP.ajax( 'PATCH', '/cart/items/pull', itemBody ).then( response => {
			HTTP.ajax('GET', '/cart/items', false).then( response => {
				$scope.items = response[0].items;
			});
		});
	};

	$scope.showItemsFromCategory = ( category ) => {
		HTTP.ajax('GET', 'productspercategory/'+ category._id, false).then( response => {
			$scope.products = response;
		})
	}
	$scope.goToOrder = () => {
		$location.path("/order")
	}
}]);