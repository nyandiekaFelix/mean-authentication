angular.module('meanAuthStarter.login', [])
	.controller('loginCtrl', ['$scope', '$state', '$auth', 'toastr', 'profileFactory', loginCtrl]);

function loginCtrl($scope, $state, $auth, toastr, profileFactory) {
	$scope.login = () => {
		$auth.login($scope.user)
			.then((response) => {
				$auth.setToken(response.data.id_token);
				profileFactory.setProfile(response.data.user);
				toastr.success('Login Successful!!');
				$state.go('home');
			})
			.catch((response) => {
				toastr.error(response.data.err);
			});
	};
}