angular.module('meanAuthStarter.profile', [])
	.factory('profileFactory', ['$q', '$http', function($q, $http){
		
		return {
			setProfile: (user) => {
				if (user) {
					window.localStorage['currentUser'] = angular.toJson(user);
				}
			},

			getProfile: () => {
				const deferred = $q.defer();
				const currentUser = angular.fromJson(window.localStorage['currentUser']);
				deferred.resolve(currentUser);
				return deferred.promise;
			},

			// updateProfile: () => {}
			
		};
	}]);