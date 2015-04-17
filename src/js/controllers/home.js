app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {
	var socket = io.connect('10.42.104.61:3000/');
    socket.emit('getScore');
    $scope.player11 = "Player 1";
    $scope.player12 = "Player 2";
    
    $scope.player21 = "Player 1";
    $scope.player22 = "Player 2";
    PlayersService.setCurrent(null);

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


  $scope.gotoStatistics = function() {
    $location.path("/statistics");
  };


    $scope.createGame = function() {
      $("#startGame").hide();
        var headers = {
         'Content-Type': 'application/json',
         'dataType':'json',
         'Accept':'application/json',
         'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
        };
        var body = {
            "team1user1":PlayersService.getPlayer11(),
            "team1user2":PlayersService.getPlayer12(),
            "team2user1":PlayersService.getPlayer21(),
            "team2user2":PlayersService.getPlayer22()
        };
        $.ajax({
            'url': 'http://10.42.104.61:3000/start',
            'type': 'POST',
            'data': body,
            'success': function(response2) {
                console.log(response2);
            } 
        });
       /* $.ajax({
          'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/tempGame.xsjs',
          'type': 'POST',
          'data': JSON.stringify(data),
          'dataType': 'json',
          'headers':headers,
          'contentType': 'application/json; charset=utf-8',
          'success': function(response) {
              console.log(response);
              response = JSON.parse(response);
              var body = {
                    gameOn:response.gameOn,
                    gameId:response.gameId
                };
                $.ajax({
                  'url': 'http://10.42.104.61:3000/start',
                  'type': 'POST',
                  'data': body,
                  'success': function(response2) {
                     console.log(response2);
                    } 
                });
            },
          'error' : function(request, status, error)
          {
            console.log("Status: "+status+" Error: " +error);
          }
        });*/
     
    };
}]);