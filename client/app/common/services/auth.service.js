(function () {
	function authService ($http, $window) {
		
		function saveToken(token){
			$window.localStorage['auth-token'] = token;
		}

		function getToken(token) {
			return $window.localStorage['auth-token'];
		}

		// Check if user logged in
		function isLoggedIn() {
			const token = getToken();

			if (token) {
				// Get payload part only from jwt
				let payload = token.split('.')[1];

				// call 'atob()' inbuilt browser method to decode base64 string
				payload = $window.atob(payload);

				payload = JSON.parse(payload);

				// check if token has expired
				return payload.exp > Date.now() / 1000;
			}

			return false;
		}

		// Get the user's details from jwt
		function getUserDetails() {
			if (isLoggedIn()) {
				const token = getToken();

				let payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return {
					email: payload.email,
					username: payload.username
				}
			}
		}

		// Call signup endpoint
		function signupUser(user) {
			// Save token when signup successful
			return $http.post('/account/signup', user).success( (data) => {
				saveToken(data.token)
			});
		}

		// Call login endpoint
		function loginUser(user) {
			// Save token when login successful
			return $http.post('/account/login', user).success( (data) => {
				saveToken(data.token)
			});
		}

		// delete token when user logs out
		function deleteToken(token) {
			$window.localStorage.removeItem('auth-token');
		}

		return {
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
			getUserDetails: getUserDetails,
			signupUser: signupUser,
			loginUser: loginUser,
			deleteToken: deleteToken
		};
	}

	angular.module('meanAuthStarter.auth', [])
	.service('authService', authService);

})();

