app.controller('adminController', ['$scope', 'HTTP','userSRV', 'user','$timeout', '$location', function( $scope, HTTP, userSRV, user, $timeout, $location ) {


	$scope.remove = (product) => {
		$scope.productId = product._id;
		HTTP.ajax('DELETE', '/delproduct/' + $scope.productId, false).then( response => {
			HTTP.ajax('GET', '/getAll', false).then( response => {
				$scope.products = response;
			});
		})
	}

	$scope.edit = (product) => {
		$scope.productId = product._id;
		$scope.editPopup = true;
		$scope.productDetails = {
			name: product.name,
			price: product.price,
			image: product.image,
			category: product.category._id
		}

	}
	$scope.updateProduct = (items) => {
		const itemsToSend = {
			name: items.name,
			image: items.image,
			price: items.price,
			category: items.category
		};

		HTTP.ajax('PATCH', '/editproduct/' + $scope.productId, itemsToSend).then( response => {
			HTTP.ajax('GET', '/getAll', false).then( response => {
				$scope.products = response;
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
		$scope.products = response;
	});
	
	$scope.submitProducts = () => {
		HTTP.ajax('PUT','/addproduct',$scope.product ).then( response => {
			HTTP.ajax('GET', '/getAll', false).then( response => {
				$scope.products = response;
			});
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