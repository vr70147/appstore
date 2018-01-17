app.directive('toggleCart',[ function() {
	return {
		restrict: 'A',
		link: ( scope, element ) => {
			element.on('click', () => {
				angular.element( document.querySelector('.cartSection') ).toggleClass('closeCart')
			})
		}
	}
}]);