app.controller('orderController', [ '$scope', 'HTTP', 'userSRV','user', function( $scope, HTTP, userSRV, user ) {

	$scope.items = [];
	HTTP.ajax('GET', '/cart/items', false).then( response => {
		angular.forEach(response[0].items, (value, key) => {
			let total = value.price;
			value.price = total.toFixed(2);
			$scope.items.push(value);						
		});
		var sum = 0;
		for(let i = 0 ; i < $scope.items.length ; i++){
			let price = $scope.items[i].price;
			let parsePrice = JSON.parse(price);
			sum += parsePrice;
			let fixedSum = sum.toFixed(2);
			$scope.sum = fixedSum;
		};
	});
	$scope.city = user.city;
		$scope.street = user.street;
	$scope.submitOrder = () => {
		const order = {
			user: user._id,
			cart: user.cart,
			city: $scope.city,
			street: $scope.street,
			dateOfDelivery: $scope.dateOfDelivery,
			creditCard: $scope.creditCard
		}
		let ccNum = $scope.creditCard;
		  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
		  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
		  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
		  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
		  let isValid = false;

		  if (visaRegEx.test(ccNum)) {
		    isValid = true;
		  } else if(mastercardRegEx.test(ccNum)) {
		    isValid = true;
		  } else if(amexpRegEx.test(ccNum)) {
		    isValid = true;
		  } else if(amexpRegEx.test(ccNum)) {
		    isValid = true;
		  }
		  if(isValid) {
		  	$scope.error = false;
		    HTTP.ajax('PUT', '/order', order).then( response => {
				HTTP.ajax('delete', '/cart', '').then(response => {

				})
			})
		  } else {
		     $scope.error = true;
			}


		};
		$scope.checkDate = (shippingDate) => {
			// HTTP.ajax('GET', '/order', false).then( response => {
			// let x;
			// let count = 0;
			// for(let i = 0 ; i < response.length ; i++) {
			// 	x = response[i].dateOfOrder;
			// 	y = x.split("T")[0];
			// 	if(y === shippingDate ){
			// 		count++
			// 	}
			// } 
			
			// const y = x.split("T")[0]
				console.log(shippingDate);
			// });
		}
}]);

app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

      return $sce.trustAsHtml(text)
    }
  })