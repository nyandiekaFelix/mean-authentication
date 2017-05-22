angular.module('meanAuthStarter.profile')
	.controller('profileCtrl', ['$scope', '$q', 'toastr', 'profileFactory', profileCtrl]);

function profileCtrl($scope, $q, toastr, profileFactory) {

	$scope.getProfile = () => {
		profileFactory.getProfile()
			.then((user) => {
				$scope.user = user;
			})
			.catch((error) => {
				toastr.error(error);
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