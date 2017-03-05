angular.module('meanAuthStarter.nav', [])
	.controller('navCtrl', function ($scope, $auth) {
		$scope.isAuthenticated = () => {
			return $auth.isAuthenticated();
		};
	});