angular.module('meanAuthStarter.routes', [])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes]);

function routes($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	// $locationProvider.html5Mode(true);

	const skipIfLoggedIn = ['$q', '$auth', function($q, $auth){
		const deferred = $q.defer();

		if ($auth.isAuthenticated()) {
			deferred.reject();
		}

		deferred.resolve();

		return deferred.promise;
	}];

	const loginRequired = ['$q', '$state', '$auth', function($q, $state, $auth){
		const deferred = $q.defer();

		if ($auth.isAuthenticated()) {
			deferred.resolve();
		}

		$state.go('login');

		return deferred.promise;
	}];

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html'
			// controller: 'homeCtrl',
		})

		.state('login', {
			url: '/login',
			templateUrl: 'app/auth/login/login.html',
			controller: 'loginCtrl',
			resolve: { skipIfLoggedIn: skipIfLoggedIn }
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'app/auth/signup/signup.html',
			controller: 'signupCtrl',
			resolve: { skipIfLoggedIn: skipIfLoggedIn }
		})

		.state('profile', {
			url: '/profile',
			templateUrl: 'app/profile/profile.html',
			controller: 'profileCtrl',
			resolve: { loginRequired: loginRequired }
		})

		.state('logout', {
			url: '/logout',
			templateUrl: null,
			controller: 'logoutCtrl',
			resolve: { loginRequired: loginRequired }
		});
}