angular.module('meanAuthStarter')
.directive('navigation',() =>{
	
	return {
		restrict: 'EA',
		templateUrl: 'app/common/navigation/nav.html',
		controller: 'navCtrl as navuser'
	};
});