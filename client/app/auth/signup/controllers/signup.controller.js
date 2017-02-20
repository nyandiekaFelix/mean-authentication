angular.module('meanAuthStarter.signup', [])
.controller('signupCtrl', ['authService', (authService) => {
	
	const user = this;
	user.details = {
		username: '',
		email: '',
		password: ''
	};

	user.onSubmit = () => {
		authService
			.signupUser(user.details)
			.error((err) => {
				alert(err);
			})
			.then( () => {
				state.go('profile');
			});
	};
}])