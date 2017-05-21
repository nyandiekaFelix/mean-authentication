angular.module('meanAuthStarter.profile', [])
	.factory('profileFactory', ['$http', function($http){
		let currentUser = undefined;

		return {
			setProfile: (user) => {
				if (user) {
					currentUser = user;
				}
			},

			getProfile: (profile) => {
				const deferred = $q.defer();
				if (angular.isDefined(currentUser)) {
					deferred.resolve(currentUser);
					return deferred.promise;
				}
			}
			
		};
	}]);