const app = angular.module('app', ['ngRoute', 'ngCookies', 'angularFileUpload']);

app.config(['$routeProvider', $routeProvider => {
   $routeProvider
   .when('/', {
    templateUrl: "login.html",
    controller: "loginController",
     resolve: {
      user: ["userSRV", "$location", function(userSRV, $location) {
        return userSRV.getUser().then(
          userInfo =>  { return userInfo },
          error => { return false
          })
      }]
    }
  })
   .when('/order', {
    templateUrl: "order.html",
    controller: "orderController",
    resolve: {
      user: ["userSRV", "$location", function(userSRV, $location) {
        return userSRV.getUser().then(
          userInfo =>  { return userInfo },
          error => { $location.path("/");
          })
      }]
    }
    })
   .when('/main', {
    templateUrl: "main.html",
    controller: "mainController",
    resolve: {
      user: ["userSRV", "$location", function(userSRV, $location) {
        return userSRV.getUser().then(
          userInfo =>  { return userInfo },
          error => {  $location.path("/"); 
        })
      }]
    }
   })
   .when('/users/register', {
    templateUrl: "register.html",
    controller: "registerController"
    })
   .when('/admin', {
    templateUrl: "admin.html",
    controller: "adminController",
    resolve: {
      user: ["userSRV", "$location", function(userSRV, $location) {
        return userSRV.getUser().then(
          userInfo =>  { return userInfo },
          error => {  $location.path("/"); 
        })
      }]
    }
    })
}]);
