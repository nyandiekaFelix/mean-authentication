const app = angular.module('meanAuthStarter', 
	['ui.router',
	 'meanAuthStarter.auth',
	 'meanAuthStarter.signup',
	 'meanAuthStarter.login',
	 'meanAuthStarter.nav']);

app.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home/home.html',
			controller: 'homeCtrl'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'app/auth/login/login.html',
			controller: 'loginCtrl'
		})

		.state('signup', {
			url: '/signup',
			templateUrl: 'app/auth/signup/signup.html',
			controller: 'signupCtrl'
		})

		.state('profile', {
			url: '/profile',
			templateUrl: 'app/account/profile/profile.html',
			controller: 'profileCtrl'
		});
});

