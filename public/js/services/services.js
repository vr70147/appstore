app.service('HTTP', function( $http ) {
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