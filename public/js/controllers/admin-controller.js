app.controller('adminController', ['$scope', 'HTTP','userSRV', 'user','$timeout', '$location', function( $scope, HTTP, userSRV, user, $timeout, $location ) {


	$scope.remove = (product) => {
		$scope.productId = product._id;
	}

	$scope.edit = (product) => {
		$scope.productId = product._id;
		$scope.editPopup = true;
		$scope.productDetails = {
			name: product.name,
			price: product.price,
			image: product.image,
			category: product.category.name
		}
	}
	$scope.updateProduct = (items) => {
		const itemsToSend = {
			name: items.name,
			image: items.image,
			price: items.price,
		};

		HTTP.ajax('PATCH', '/editproduct/' + $scope.productId, itemsToSend).then( response => {
			HTTP.ajax('GET', '/getAll', false).then( response => {
				$scope.items = [];
				$scope.products = response;
				$scope.items.push( response );		
			});
			$scope.editPopup = false;
		})
	}

	$scope.closePopup = () => {
		$scope.editPopup = false;
	}

	
	$scope.options = [];
	HTTP.ajax('GET','/category', false).then( response => {
		angular.forEach(response, (value, key) => {
  			$scope.options.push( value );
		});
	});
	HTTP.ajax('GET', '/getAll', false).then( response => {
		$scope.items = [];
		$scope.products = response;
		console.log(response);
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
			$scope.category.name = null;
			$scope.confirmAdd = true;
			$timeout(() => {
				$scope.confirmAdd = false;
			}, 3000)
		});
	};
	$scope.confirmAdd = false;
}]);