angular.module('meanAuthStarter.nav', [])
	.controller('navCtrl', ['$scope', '$auth', navCtrl]);

function navCtrl($scope, $auth) {
	$scope.isAuthenticated = () => {
		return $auth.isAuthenticated();
	};
}