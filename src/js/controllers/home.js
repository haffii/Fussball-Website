app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {


  $scope.topList = {};
  $scope.goalHistory = {};
  var apiUrl = '10.42.104.61:3000/';
	var socket = io.connect(apiUrl);
  var gameOn = false;
  var countdown;
  var gamestart = 0;
  setInterval(countUp, 1000);
  $scope.player11=[];
  $scope.player12=[];
  $scope.player21=[];
  $scope.player22=[];
  $scope.player11.ImagePath='images/emptySlot.png';
  $scope.player12.ImagePath='images/emptySlot.png';
  $scope.player21.ImagePath='images/emptySlot.png';
  $scope.player22.ImagePath='images/emptySlot.png';
  console.log($scope.player11.ImagePath);
    $.ajax({
            'url': 'http://' + apiUrl + 'players',
            'type': 'GET',
            'success': function(data) {
                if(data.length){
                  $scope.player11 = data[0];
                  $scope.player12 = data[1];
                  $scope.player21 = data[2];
                  $scope.player22 = data[3];
                  gameOn = true;
                  PlayersService.setPlayers(data);
                  PlayersService.setGameOn(true);
                  $scope.$digest();
                }
                //console.log(data);
              },
              'error' : function(res){
                  console.log(res);
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
   
    socket.on('goal1', function(score, time){
    $('#team1').text(score);
    //console.log(time);
      if(time){
        $scope.goalHistory.unshift(time);
        $scope.$digest();
      }
    });

    socket.on('goal2', function(score, time){
    $('#team2').text(score);
      if(time){
        $scope.goalHistory.unshift(time);
        $scope.$digest();
      }
    });

    socket.on('gameover', function(data){
      gameOn = false;
      //console.log("gameover");
    });

    socket.on('gametime', function(data, goalHistory){
      gamestart = new Date(data);
      if(goalHistory){
        $scope.goalHistory = goalHistory.reverse();
        $scope.$digest();
        //console.log($scope.goalHistory);
      }
    });

    function countUp(){
      //console.log(gameOn);
      if(gamestart !== 0 && gameOn){
        now = new Date();
        dif = new Date(now.getTime() - gamestart.getTime());
        var min = dif.getMinutes() < 10 ? '0' + dif.getMinutes() : dif.getMinutes(); 
        var sec = dif.getSeconds() < 10 ? '0' + dif.getSeconds() : dif.getSeconds();

        $(".gameClock").text(min + ":" + sec);
      }

    }

    socket.on('updatePlayers', function(data){
      PlayersService.setPlayers(data);
      $scope.player11 = data[0];
      $scope.player12 = data[1];
      $scope.player21 = data[2];
      $scope.player22 = data[3];
      $scope.goalHistory = {};
      $scope.$digest();
      if($scope.player11){
        gameOn = true;
      }
      else{
        $(".gameClock").text("00:00");
        $scope.player11=[];
        $scope.player12=[];
        $scope.player21=[];
        $scope.player22=[];
        $scope.player11.ImagePath='images/emptySlot.png';
        $scope.player12.ImagePath='images/emptySlot.png';
        $scope.player21.ImagePath='images/emptySlot.png';
        $scope.player22.ImagePath='images/emptySlot.png';
      }
      if($scope.player11 && $scope.player12 && $scope.player21 && $scope.player22){
        $('#startGame').hide();
        $('#Rematch').hide();
        $('#newGame').hide();
      }
    });

    $scope.clickplayer = function(id) {
      if(id == 11 && $scope.player11.UserId){
        $location.path("/Users/"+$scope.player11.UserId);
      }
      else if(id == 12 && $scope.player12.UserId){
        $location.path("/Users/"+$scope.player12.UserId);
      }
      else if(id == 21 && $scope.player21.UserId){
        $location.path("/Users/"+$scope.player21.UserId);
      }
      else if(id == 22 && $scope.player22.UserId){
        $location.path("/Users/"+$scope.player22.UserId);
      }
    };

var headers = {
    'Content-Type': 'application/json',
    'dataType':'json',
    'Accept':'application/json',
    'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
  };

  $.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/usersELO.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
      $scope.topList = response;
      $scope.$digest();
      //console.log(response);
    },
    'error' : function(response) {
      console.log("error : ");

    }
  });

}]);