app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {
	var socket = io.connect('10.42.104.61:3000/');
    socket.emit('getScore');
    $scope.player11 = "Player 1";
    $scope.player12 = "Player 2";
    
    $scope.player21 = "Player 1";
    $scope.player22 = "Player 2";

    if(PlayersService.getPlayer11()){
        $scope.player11 = PlayersService.getPlayer11().Name;
        PlayersService.setCurrent(null);
    }
    if(PlayersService.getPlayer12()){
        $scope.player12 = PlayersService.getPlayer12().Name;
        PlayersService.setCurrent(null);
    }
    if(PlayersService.getPlayer21()){
        $scope.player21 = PlayersService.getPlayer21().Name;
        PlayersService.setCurrent(null);
    }
    if(PlayersService.getPlayer22()){
        $scope.player22 = PlayersService.getPlayer22().Name;
        PlayersService.setCurrent(null);
    }
    if(PlayersService.getPlayer11() && PlayersService.getPlayer12() && PlayersService.getPlayer21() && PlayersService.getPlayer22()){
        console.log("dude in the draws");
        $('#startGame').show();
        
    }

    socket.on('goal1', function(score){
    $('#team1').text(score);
    });

    socket.on('goal2', function(score){
    $('#team2').text(score);
    });

    $scope.clickplayer = function(id) {
    PlayersService.setCurrent(id);
    $location.path("/users");
    };

}]);