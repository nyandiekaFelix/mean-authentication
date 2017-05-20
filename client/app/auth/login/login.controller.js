angular.module('meanAuthStarter.login', [])
	.controller('loginCtrl', ['$scope', '$state', '$auth', 'toastr', loginCtrl]);

function loginCtrl($scope, $state, $auth, toastr) {
	$scope.login = () => {
		$auth.login($scope.user)
			.then((response) => {
				$auth.setToken(response.data.id_token);
				toastr.success('Login Successful!!');
				$state.go('home');
			})
			.catch((error) => {
				toastr.error(error.data.err);
			});
	};
}