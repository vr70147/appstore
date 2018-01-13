app.directive('getItems', function() {
    $scope.items = []
	HTTP.ajax('GET', '/cart/items', false).then( response => {
		angular.forEach(response[0].items, (value, key) => {
			let total = value.price;
			value.price = total.toFixed(2);
			$scope.items.push(value);						
		})
		var sum = 0;
		for(let i = 0 ; i < $scope.items.length ; i++){
			let price = $scope.items[i].price;
			let parsePrice = JSON.parse(price);
			sum += parsePrice;
			let fixedSum = sum.toFixed(2);
			$scope.sum = fixedSum;
		};
	});
});