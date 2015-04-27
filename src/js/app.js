var app = angular.module("Fusball", ["ngRoute"]);

app.config(["$routeProvider","$httpProvider", function($routeProvider,$httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "HomeController",
	}).when("/users", {
		templateUrl: "templates/users.html",
		controller: "UserController",
	}).when("/statistics", {
		templateUrl: "templates/statistics.html",
		controller: "StatisticsController",
	}).when("/Users/:ID", {
		templateUrl: "templates/user.html",
		controller: "",
	}).otherwise({ redirectTo: "/" });
}]);