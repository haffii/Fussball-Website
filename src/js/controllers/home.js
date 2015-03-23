app.controller("HomeController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	var socket = io.connect('http://localhost:3000/');

    socket.on('goal1', function(score){
    $('#team1').text(score);
    });

    socket.on('goal2', function(score){
    $('#team2').text(score);
    });

    $scope.connect = function() {
    $location.path("/users");
    };
}]);