angular.module('meanAuthStarter.profile', [])
	.factory('profileFactory', ['$http', function($http){
		return {
			// get user object from local storage
			getProfile: () => {
				return $http.get(`/api/users/profile`);
			},

			updateProfile: (profile) => {
				return $http.put(`/api/users/profile`, profile);
			}
			
		};
	}]);