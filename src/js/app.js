var app = angular.module("Fusball", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "HomeController",
	}).otherwise({ redirectTo: "/" });
}]);