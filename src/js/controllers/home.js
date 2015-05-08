app.controller("HomeController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {


  $scope.topList = {};
  //$filter('number')(number, fractionSize);
  var apiUrl = '10.42.104.61:3000/';
	var socket = io.connect(apiUrl);
  var gameOn = false;
  var countdown;

    $.ajax({
            'url': 'http://' + apiUrl + 'players',
            'type': 'GET',
            'success': function(data) {
                if(data.length){
                  $scope.player11 = data[0];
                  $scope.player12 = data[1];
                  $scope.player21 = data[2];
                  $scope.player22 = data[3];
                  PlayersService.setPlayers(data);
                  PlayersService.setGameOn(true);
                  $scope.$digest();
                }
                console.log(data);
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
   
    socket.on('goal1', function(score){
    $('#team1').text(score);
    });

    socket.on('goal2', function(score){
    $('#team2').text(score);
    });

    socket.on('gameover', function(data){
      console.log("gameover");
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
      console.log(response);
    },
    'error' : function(response) {
      console.log("error : ");

    }
  });

}]);