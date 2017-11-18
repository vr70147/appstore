const app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', $routeProvider => {
   $routeProvider
   .when('/', {
    templateUrl: "main.html",
    controller: "mainController"
   })
   .when('/users/login', {
    templateUrl: "login.html",
    controller: "loginController"
   })
   .when('/users/register', {
    templateUrl: "register.html",
    controller: "registerController"
    })
   .when('/product', {
    templateUrl: "product.html",
    controller: "productController"
    })
}]);
