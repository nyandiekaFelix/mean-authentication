const app = angular.module('meanAuthStarter', ['ui.router',
    'ngSanitize',
    'toastr',
    'satellizer',
    'meanAuthStarter.nav',
    'meanAuthStarter.routes',
    'meanAuthStarter.signup',
    'meanAuthStarter.login',
    'meanAuthStarter.profile',
    'meanAuthStarter.logout'
]);

app.config(['$authProvider', '$httpProvider', defaultConfig]);

function defaultConfig($authProvider, $httpProvider) {
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/api/user/login';
    $authProvider.signupUrl = '/api/user/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
}