app.controller("TableController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {

  var apiUrl = '10.42.104.61:3000/';
	var socket = io.connect(apiUrl);
  $scope.gameOn = false;
  var countdown;
  var endGameUsed = false;
    $.ajax({
            'url': 'http://' + apiUrl + 'players',
            'type': 'GET',
            'success': function(data) {
                if(data.length){
                  //console.log(data[0]);
                  $scope.player11 = data[0];
                  $scope.player12 = data[1];
                  $scope.player21 = data[2];
                  $scope.player22 = data[3];
                  
                  PlayersService.setPlayers(data);
                  $scope.gameOn = true;
                  $('#modalButtonEndGame').show();
                  PlayersService.setGameOn(true);
                  $scope.$digest();
                }
                else{
                  $scope.player11 = {
                    ImagePath:'images/clicktoadd.png'
                  };
                  $scope.player12= {
                    ImagePath:'images/clicktoadd.png'
                  };
                  $scope.player21 = {
                    ImagePath:'images/clicktoadd.png'
                  };
                  $scope.player22 = {
                    ImagePath:'images/clicktoadd.png'
                  };
                  
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
        'url': 'http://' + apiUrl + 'getScore',
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

 /*   socket.on('startCountDown', function(){
      $('.countdown').countdown(onGameEnd, 10);
    });*/

    socket.on('gameover', function(data){
      $('#modalButtonEndGame').hide();
      if(!endGameUsed){
        $('#Rematch').show();
        $('#newGame').show();
      }
      else{
        $('#Rematch').hide();
        $('#newGame').hide();
      }
      endGameUsed = false;
    });

    socket.on('updatePlayers', function(data){
      PlayersService.setPlayers(data);
      $scope.player11 = data[0];
      $scope.player12 = data[1];
      $scope.player21 = data[2];
      $scope.player22 = data[3];
      $scope.$digest();
      if($scope.player11 && $scope.player12 && $scope.player21 && $scope.player22){
        $('#startGame').hide();
        $('#Rematch').hide();
        $('#newGame').hide();
      }
    });

    $scope.clearCurrent = function(){
      //console.log("worked");
    };

    $scope.clickplayer = function(id) {
      if(!$scope.gameOn){
    PlayersService.setCurrent(id);
    $location.path("/pickuser");
    }
    else{
      if(id == 11){
        $location.path("/Users/"+$scope.player11.UserId);
      }
      else if(id == 12){
        $location.path("/Users/"+$scope.player12.UserId);
      }
      else if(id == 21){
        $location.path("/Users/"+$scope.player21.UserId);
      }
      else if(id == 22){
        $location.path("/Users/"+$scope.player22.UserId);
      }
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

/*  function updateGame(){
     $.ajax({
<<<<<<< HEAD
            'url': 'http://127.0.1:3000/players',
=======
            'url': 'http://127.0.0:3000/players',
>>>>>>> origin/master
            'type': 'GET',
            'success': function(data) {
                console.log(data);
            }
        });
  }*/
    $scope.createGame = function() {
      $("#startGame").hide();
        var body = {
            "team1user1UserId": PlayersService.getPlayer11().UserId,
            "team1user1Name" : PlayersService.getPlayer11().Name,
            "team1user1ImagePath":PlayersService.getPlayer11().ImagePath,
            "ELO0" : PlayersService.getPlayer11().ELO,

            "team1user2UserId": PlayersService.getPlayer12().UserId,
            "team1user2Name" : PlayersService.getPlayer12().Name,
            "team1user2ImagePath":PlayersService.getPlayer12().ImagePath,
            "ELO1" : PlayersService.getPlayer12().ELO,
            
            "team2user1UserId": PlayersService.getPlayer21().UserId,
            "team2user1Name" : PlayersService.getPlayer21().Name,
            "team2user1ImagePath":PlayersService.getPlayer21().ImagePath,
            "ELO2" : PlayersService.getPlayer21().ELO,

            "team2user2UserId": PlayersService.getPlayer22().UserId,
            "team2user2Name" : PlayersService.getPlayer22().Name,
            "team2user2ImagePath":PlayersService.getPlayer22().ImagePath,
            "ELO3" : PlayersService.getPlayer22().ELO
        };
        $.ajax({
            'url': 'http://' + apiUrl + 'start',
            'type': 'POST',
            'data': body,
            'success': function(response2) {
                $scope.gameOn = true;
                PlayersService.setGameOn(true);
                $('#modalButtonEndGame').show();

                //updateGame();
            }
        });
    };

    $scope.rematch = function(){
      PlayersService.rematch();
      $scope.player11 = PlayersService.getPlayer11();
      $scope.player12 = PlayersService.getPlayer12();
      $scope.player21 = PlayersService.getPlayer21();
      $scope.player22 = PlayersService.getPlayer22();
      $("#Rematch").hide();
      $("#startGame").show();
      $("#newGame").show();
    };

    $scope.endGame = function(){
      endGameUsed = true;
      $.ajax({
            'url': 'http://' + apiUrl + 'endGame',
            'type': 'POST',
            'success': function(response) {
              //console.log(response);
                $scope.gameOn = false;
                PlayersService.setGameOn(false);
                $('#modalButtonEndGame').hide();
            }
        });
    };

    $scope.newGame = function(){
      $scope.gameOn = false;
      $('#modalButtonEndGame').hide();
      PlayersService.setGameOn(false);
      $('#team1').text(0);
      $('#team2').text(0);
      PlayersService.clearPlayers();
      $scope.player11 = null;
      $scope.player12 = null;
      $scope.player21 = null;
      $scope.player22 = null;
    };
function name(obj){
  for(var i = 0; i<obj.length; i++){
    var lo1 = obj[i].LOSER1NAME.split(" ");
    var lo2 = obj[i].LOSER2NAME.split(" ");
    var wi1 = obj[i].WINNER1NAME.split(" ");
    var wi2 = obj[i].WINNER2NAME.split(" ");
    obj[i].STARTTIME = obj[i].STARTTIME.split(" ")[0];
    
    if(lo1.length > 2){
      obj[i].LOSER1NAME = lo1[0]+" "+lo1[1];
    }
    else{
      obj[i].LOSER1NAME = lo1[0];
    }
    if(lo2.length > 2){
      obj[i].LOSER2NAME = lo2[0]+" "+lo2[1];
    }
    else{
      obj[i].LOSER2NAME = lo2[0];
    }
    if(wi1.length > 2){
      obj[i].WINNER1NAME = wi1[0]+" "+wi1[1];
    }
    else{
      obj[i].WINNER1NAME = wi1[0];
    }
    if(wi2.length > 2){
      obj[i].WINNER2NAME = wi2[0]+" "+wi2[1];
    }
    else{
      obj[i].WINNER2NAME = wi2[0];
    }

    
  }
  $scope.names = obj;
  $scope.$digest();
  //console.log(obj);
}
/*
$.fn.countdown = function (callback, duration) {
  var container = $(this[0]).html(duration);
  $('.countdown').show();
  countdown = setInterval(function () {
    if (duration > 0) {
      container.html(--duration);
    }
    else
    {
      container.html(--duration);
      clearInterval(countdown);
      callback.call(container);
    }
    }, 1000);

};*/

}]);