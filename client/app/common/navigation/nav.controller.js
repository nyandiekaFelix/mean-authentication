(function() {
	function navCtrl(authService) {
		const user = this;
		user.isLoggedIn = authService.isLoggedIn();
		user.getUserDetails = authService.getUserDetails();
	}
	angular.module('meanAuthStarter.nav', [])
	.controller('navCtrl', navCtrl);
})();