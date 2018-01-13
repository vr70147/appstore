app.service('HTTP',  function( $http ) {
   this.ajax = function( method, url, data ) {
        return $http({
           method: method,
           url: url,
           data: data
         }).then( response => {
            return response.data;
         });
    };
});

app.service('userSRV', ['$q', 'HTTP', function( $q, HTTP) {

	var user = false;

	return {
	
		setUser: userData => {
			this.user = userData
		},
		getUser: () => {
			const deffered = $q.defer()
			if(user){
				deffered.resolve( user )
			} else {
				HTTP.ajax('GET', '/users/session', false).then( response => {
					if( response.passport ) {
						user = response.passport.user
						deffered.resolve(user)
					} else {
						deffered.reject()
					}
				})
			}

			return deffered.promise
		}
	}
}]);


app.service('cartSRV', ['$q', 'HTTP', function( $q, HTTP) {
	return {


		getCartItems: () => {
			const deffered = $q.defer()		
			HTTP.ajax('GET', '/cart/items', false).then( response => {
				let cart = {
					items: [],
					total: 0
				}
				cart.items = response[0].items

				if( cart.items.length )
					cart.total = cart.items.map( item => item.price).reduce( ( total, currentItemPrice ) => { return total + currentItemPrice } )
						
				deffered.resolve( cart )
			})

			return deffered.promise
		},


		addItemToCart: ( _id, qty ) => {
				HTTP.ajax('PATCH', '/cart/items', {_id, qty}).then( response => {
					console.log(response);
				})
		}
	}
	// return {
	// 	getCartItems: () => {
	// 		let cart = {
	// 			items: [],
	// 			total: 0
	// 		}

	// 		HTTP.ajax('GET', '/cart/items', false).then( response => {
	// 			console.log(response)
	// 			// 	angular.forEach(response[0].items, (value, key) => {
	// 			// 		let total = value.price;
	// 			// 		value.price = JSON.parse(total.toFixed(2));
	// 			// 		cart.items.push(value);
	// 			// 		$scope.itemPrice = value.quantity	

	// 			// 	});
	// 			// 	var sum = 0;
	// 			// 	for(let i = 0 ; i < $scope.items.length ; i++){
	// 			// 		let price = $scope.items[i].price;
	// 			// 		let parsePrice = JSON.parse(price);
	// 			// 		sum += parsePrice;
	// 			// 		let fixedSum = sum.toFixed(2);
	// 			// 		$scope.sum = fixedSum;
	// 			// 	};
	// 			// });
	// 	})
	// }

}])
