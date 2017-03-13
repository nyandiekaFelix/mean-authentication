angular.module('meanAuthStarter.profile', [])
	.factory('profileFactory', ['$http', function($http){
		return {

			getProfile: () => {
				return $http.get('/api/user/profile');
			},

			updateProfile: (profile) => {
				return $http.put('/api/user/profile', profile);
			}
			
		};
	}]);