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
    $authProvider.baseUrl = '/api/auth';
    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/register';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'JWT';
    $authProvider.storageType = 'localStorage';
}