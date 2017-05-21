angular.module('meanAuthStarter.profile')
	.controller('profileCtrl', ['$scope', '$http', 'toastr', 'profileFactory', profileCtrl]);

function profileCtrl($scope, $http, toastr, profileFactory) {

	$scope.getProfile = () => {
		profileFactory.getProfile()
			.then((response) => {
				$scope.user = response.data;
			})
			.catch((response) => {
				toastr.error(response.data.err);
			});
	};

	$scope.updateProfile = () => {
		profileFactory.updateProfile($scope.user)
			.then(() => {
				toastr.success('Profile Updated!');
			})
			.catch((response) => {
				toastr.error(response.data.err);
			});
	};

	$scope.getProfile();
}	