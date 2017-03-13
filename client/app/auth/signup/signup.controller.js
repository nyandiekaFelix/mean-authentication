angular.module('meanAuthStarter.signup', [])
	.controller('signupCtrl', ['$scope', '$state', '$auth', 'toastr', signupCtrl]);

function signupCtrl($scope, $state, $auth, toastr) {
	$scope.signup = () => {
		$auth.signup($scope.user)
			.then((response) => {
				$auth.setToken(response);
				$state.go('home');
				toastr.info('You have successfully registered your account')
			})	
			.catch((response) => {
				toastr.error(response.data.message);
			});
	};
}