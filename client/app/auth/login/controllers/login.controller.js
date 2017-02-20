angular.module('meanAuthStarter.login', [])
.controller('loginCtrl', ['authService', (authService) => {
	
	const user = this;
	user.details = {
		email: '',
		password: ''
	};

	user.onSubmit = () => {
		authService
			.loginUser(user.details)
			.error((err) => {
				alert(err);
			})
			.then( () => {
				state.go('profile');
			});
	};
}])