app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {
	var socket = io.connect('10.42.104.61:3000/');
         
    $.ajax({
            'url': 'http://10.42.104.61:3000/players',
            'type': 'GET',
            'success': function(data) {
                console.log(data);
                if(data.Players.length){
                  console.log("Party and bullshit");
                  console.log(data.Players[0]);
                  $scope.player11 = data.Players[0].Name;
                  $scope.player12 = data.Players[1].Name;
                  $scope.player21 = data.Players[2].Name;
                  $scope.player22 = data.Players[3].Name;
                 $scope.$digest();
                }
                else{
                  console.log("booo here");
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
                  $scope.$digest();         
              } 
            }
        });  

    socket.emit('getScore');
   /* if(!gameOn){
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
  }
  else{
    updateGame();
      
  }*/
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

  function updateGame(){
     $.ajax({
            'url': 'http://10.42.104.61:3000/players',
            'type': 'GET',
            'success': function(data) {
                console.log(data);

            } 
        });  
  }
    $scope.createGame = function() {
      $("#startGame").hide();
        var body = {
            "team1user1UserId": PlayersService.getPlayer11().UserId,
            "team1user1Name" : PlayersService.getPlayer11().Name,
            "team1user1ImagePath":PlayersService.getPlayer11().ImagePath,

            "team1user2UserId": PlayersService.getPlayer12().UserId,
            "team1user2Name" : PlayersService.getPlayer12().Name,
            "team1user2ImagePath":PlayersService.getPlayer12().ImagePath,
            
            "team2user1UserId": PlayersService.getPlayer21().UserId,
            "team2user1Name" : PlayersService.getPlayer21().Name,
            "team2user1ImagePath":PlayersService.getPlayer21().ImagePath,

            "team2user2UserId": PlayersService.getPlayer22().UserId,
            "team2user2Name" : PlayersService.getPlayer22().Name,
            "team2user2ImagePath":PlayersService.getPlayer22().ImagePath
        };
        $.ajax({
            'url': 'http://10.42.104.61:3000/start',
            'type': 'POST',
            'data': body,
            'success': function(response2) {
                gameOn = true;
                updateGame();
            } 
        });     
    };
}]);