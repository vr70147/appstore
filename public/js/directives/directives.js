app.directive('toggleCart',[ function() {
	return {
		restrict: 'A',
		link: ( scope, element ) => {
			element.on('click', () => {
				angular.element( document.querySelector('.cartSection') ).toggleClass('closeCart')
				// let p = element.parent();
				// 	let allParents = [];
				// 	while (p.length > 0) {
				// 	    allParents.push(p[0]);
				// 	    p = p.parent();
				// 	}
				// 	console.log(allParents)
			})
		}
	}
}]);