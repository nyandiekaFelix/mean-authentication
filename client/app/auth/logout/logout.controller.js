angular.module('meanAuthStarter.logout', [])
	.controller('logoutCtrl', ['$state', '$auth', 'toastr', logoutCtrl]);

function logoutCtrl($state, $auth, toastr) {

	if (!$auth.isAuthenticated()){ 
		return; 
	}

	$auth.logout()
		.then(() => {
			toastr.info('You have been logged out!');
			$state.go('login');
		});
}