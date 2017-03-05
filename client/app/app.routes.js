(() => {
	const app = angular.module('meanAuthStarter.routes', []);
	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes]);

	function routes($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/home/home.html',
				// controller: 'homeCtrl',
			})

			.state('login', {
				url: '/login',
				templateUrl: 'app/auth/login/login.html',
				controller: 'loginCtrl',
			})

			.state('register', {
				url: '/register',
				templateUrl: 'app/auth/signup/signup.html',
				controller: 'signupCtrl',
			})

			.state('profile', {
				url: '/profile',
				templateUrl: 'app/account/profile/profile.html',
				controller: 'profileCtrl',
			});

		// Reject a promise if the user is logged in
		function skipIfLoggedIn($q, $auth) {
			const deferred = $q.defer();

			if($auth.isAuthenticated()) {
				deferred.reject();
			}
			deferred.resolve();

			return deferred.promise;
		}

		// Redirect user to login page if not logged in
		function loginRequired($q, $state, $auth) {
			const deferred = $q.defer();

			if ($auth.isAuthenticated()) {
				deferred.resolve();
			}

			$state.go('login');

			return deferred.promise;
		}
	}
})();