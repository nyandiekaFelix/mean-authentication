angular.module('meanAuthStarter.signup', [])
	.controller('signupCtrl', ['$scope', '$state', '$auth', 'toastr', 'profileFactory', signupCtrl]);

function signupCtrl($scope, $state, $auth, toastr, profileFactory) {
	$scope.signup = () => {
		$auth.signup($scope.user)
			.then((response) => {
				profileFactory.setUser(response.data.user);
				$auth.setToken(response.data.id_token);
				toastr.success('You have successfully registered your account');
				$state.go('home');
			})	
			.catch((response) => {
				toastr.error(response.err);
			});
	};
}