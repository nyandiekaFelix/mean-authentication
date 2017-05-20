angular.module('meanAuthStarter.signup', [])
	.controller('signupCtrl', ['$scope', '$state', '$auth', 'toastr', signupCtrl]);

function signupCtrl($scope, $state, $auth, toastr) {
	$scope.signup = () => {
		$auth.signup($scope.user)
			.then((response) => {
				$auth.setToken(response.data.id_token);
				toastr.success('You have successfully registered your account');
				$state.go('home');
			})	
			.catch((response) => {
				toastr.error(response.data.err);
			});
	};
}