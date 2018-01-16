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
}])