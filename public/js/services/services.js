app.service('HTTP', function( $http ) {
    this.ajax = function( method, url, data, successCallback, failureCallback ) {
        $http({
           method: method,
           url: url,
           data: data
         }).then( response => {
             successCallback(response);
         }, response => {
             failureCallback(response);
         });
    };
});