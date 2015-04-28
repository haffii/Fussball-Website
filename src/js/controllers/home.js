app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {
	var socket = io.connect('10.41.112.43:3000/');
  var gameOn = false;    
    $.ajax({
            'url': 'http://10.41.112.43:3000/players',
            'type': 'GET',
            'success': function(data) {
                console.log(data);
                if(data.length){
                  $scope.player11 = data[0];
                  $scope.player12 = data[1];
                  $scope.player21 = data[2];
                  $scope.player22 = data[3];
                  gameOn = true;
                  $scope.$digest();
                }
                else{
                  $scope.player11 = "Player 1";
                  $scope.player12 = "Player 2";
                  $scope.player21 = "Player 1";
                  $scope.player22 = "Player 2";
                  
                  PlayersService.setCurrent(null);

                  if(PlayersService.getPlayer11()){
                    $scope.player11 = PlayersService.getPlayer11();
                     PlayersService.setCurrent(null);
                  }
                  if(PlayersService.getPlayer12()){
                     $scope.player12 = PlayersService.getPlayer12();
                      PlayersService.setCurrent(null);
                   }
                  if(PlayersService.getPlayer21()){
                    $scope.player21 = PlayersService.getPlayer21();
                    PlayersService.setCurrent(null);
                  }
                  if(PlayersService.getPlayer22()){
                    $scope.player22 = PlayersService.getPlayer22();
                    PlayersService.setCurrent(null);
                  }
                 if(PlayersService.getPlayer11() && PlayersService.getPlayer12() && PlayersService.getPlayer21() && PlayersService.getPlayer22()){
                   $('#startGame').show();
                  }
                  $scope.$digest();
              } 
            }
        });  

   $.ajax({
        'url': 'http://10.41.112.43:3000/getScore',
        'type': 'GET',
        'success': function(data) {
        $('#team1').text(data[0]);
        $('#team2').text(data[1]);
      }
    });
   
    socket.on('goal1', function(score){
    $('#team1').text(score);
    });

    socket.on('goal2', function(score){
    $('#team2').text(score);
    });

    socket.on('startCountDown', function(){
      $('.countdown').countdown(onGameEnd, 10);
    });

    socket.on('gameover', function(data){
      $('#Rematch').show();
      $('#newGame').show();
      console.log("gameover");
    });

    socket.on('updatePlayers', function(data){
      console.log("this:");
      console.log(data);
      $scope.player11 = data[0];
      $scope.player12 = data[1];
      $scope.player21 = data[2];
      $scope.player22 = data[3];
      $scope.$digest();
      if($scope.player11 && $scope.player12 && $scope.player21 && $scope.player22){
        $('#startGame').hide();
      }
    });

    $scope.clickplayer = function(id) {
      if(!gameOn){
    PlayersService.setCurrent(id);
    $location.path("/users");
    }
    };


  $scope.gotoStatistics = function() {
    $location.path("/statistics");
  };

  function onGameEnd(){
      $(this[0]).html("Game Over");
      $('#Rematch').show();
      $('#newGame').show();
  }

  function updateGame(){
     $.ajax({
            'url': 'http://10.41.112.43:3000/players',
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
            'url': 'http://10.41.112.43:3000/start',
            'type': 'POST',
            'data': body,
            'success': function(response2) {
                gameOn = true;
                updateGame();
            }
        });
    };

    $scope.rematch = function(){
      PlayersService.rematch();
      $scope.createGame();
      $scope.player11 = PlayersService.getPlayer11();
      $scope.player12 = PlayersService.getPlayer12();
      $scope.player21 = PlayersService.getPlayer21();
      $scope.player22 = PlayersService.getPlayer22();
      $("#Rematch").hide();
      $("#newGame").hide();
    };

    $scope.newGame = function(){
      gameOn = false;
      PlayersService.clearPlayers();
      $scope.player11 = null;
      $scope.player12 = null;
      $scope.player21 = null;
      $scope.player22 = null;
    };


$.fn.countdown = function (callback, duration) {
  var container = $(this[0]).html(duration);
  var countdown = setInterval(function () {
    if (--duration) {
      container.html(duration);
    }
    else
    {
      clearInterval(countdown);
      callback.call(container);
    }
    }, 1000);

};

}]);