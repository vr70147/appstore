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
}])
