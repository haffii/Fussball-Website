app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {


  $scope.topList = {};
  $scope.goalHistory = {};
  var apiUrl = '10.42.104.61:3000/';
	var socket = io.connect(apiUrl);
  var gameOn = false;
  var countdown;
  var gamestart = 0;
  var counter = setInterval(countUp, 1000);
  $scope.player11=[];
  $scope.player12=[];
  $scope.player21=[];
  $scope.player22=[];
  $scope.player11.ImagePath='images/emptySlot.png';
  $scope.player12.ImagePath='images/emptySlot.png';
  $scope.player21.ImagePath='images/emptySlot.png';
  $scope.player22.ImagePath='images/emptySlot.png';
  $(".goalHistoryContainer").hide();
  $(".topScoreContainer").hide();
  if(!gameOn){
     $(".topScoreContainer").show();
     $(".goalHistoryContainer").hide();
  }
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
                  $(".topScoreContainer").hide();
                  $(".goalHistoryContainer").show();
                  $scope.$digest();
                }
              },
              'error' : function(res){
                console.log('error: ');
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
   
    socket.on('goal1', function(score, goalHistory){
    $('#team1').text(score);
      if(goalHistory){
        $scope.goalHistory = goalHistory;
        $scope.$digest();
      }
    });

    socket.on('goal2', function(score, goalHistory){
    $('#team2').text(score);
      if(goalHistory){
        $scope.goalHistory = goalHistory;
        $scope.$digest();
      }
    });

    socket.on('gameover', function(data){
      gameOn = false;
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
      $(".topScoreContainer").show();
     $(".goalHistoryContainer").hide();
      $scope.$digest();
    },
    'error' : function(response) {
      console.log("error : ");
      console.log(response);

    }
    });
    });

    socket.on('gametime', function(data, goalHistory){
      gamestart = new Date(data);
      if(goalHistory){
        $scope.goalHistory = goalHistory;
        $scope.$digest();
      }
    });

    socket.on('viewCount', function(data){
      console.log(data);
    });

    function countUp(){
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
        $(".topScoreContainer").hide();
        $(".goalHistoryContainer").show();
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

    $scope.topListLink = function(id){
      $location.path("/Users/"+id);
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
    },
    'error' : function(response) {
      console.log("error : ");
      console.log(response);

    }
  });

  $scope.$on("$destroy", function() {
        clearInterval(counter);
    });

}]);