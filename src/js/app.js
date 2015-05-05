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
	}).when("/pickuser", {
		templateUrl: "templates/users.html",
		controller: "UserController",
	}).when("/statistics", {
		templateUrl: "templates/statistics.html",
		controller: "StatisticsController",
	}).when("/Users/:UserId", {
		templateUrl: "templates/user.html",
		controller: "UserIDController",
	}).when("/table", {
		templateUrl: "templates/table.html",
		controller: "TableController",
	}).when("/editUser/:UserId", {
		templateUrl: "templates/editUser.html",
		controller: "UserIDController",
	}).when("/changePassword/:UserId", {
		templateUrl: "templates/changePassword.html",
		controller: "UserIDController",
	}).when("/addUser", {
		templateUrl: "templates/addUser.html",
		controller: "adminController",
	}).otherwise({ redirectTo: "/" });
}]);