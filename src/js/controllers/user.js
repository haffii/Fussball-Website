app.controller("UserController", ["$scope", "$location", "SocketService","PlayersService","$http", function($scope, $location, SocketService,PlayersService, $http) {
var headers = {
  'Content-Type': 'application/json',
  'dataType':'json',
  'Accept':'application/json',
  'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
};
 $.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/tempUser.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
      showPlayers(response);   
    }
});


 function showPlayers(players){
  $scope.arr = players;
  $scope.$digest();
 }

 $scope.thisPlayer=function(player){
  console.log('This is his user id : '+player.UserId);
   if(PlayersService.getCurrent() == 11){
        PlayersService.setPlayer11(player);
    }
    else if(PlayersService.getCurrent() == 12){
         PlayersService.setPlayer12(player);
    }
    else if(PlayersService.getCurrent() == 21){
         PlayersService.setPlayer21(player);
    }
    else if(PlayersService.getCurrent() == 22){
         PlayersService.setPlayer22(player);
    }
    $location.path("/");
 };



     $scope.doStuff = function() {
    //$location.path("/users");
   
    //$location.path("/");
    var body1 = {
        "team1user1":4,
        "team1user2":5,
        "team2user1":6,
        "team2user2":7
    };
var data = {
        "team1user1":4,
        "team1user2":5,
        "team2user1":6,
        "team2user2":7
                    };
  $.ajax({
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
                }
            });
 
 /*$.ajax({
        'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/tempGame.xsjs',
        //'contentType': 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
          'dataType':'json',
          'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA==',
        'type': 'POST',
        'data': body,
        'success': function(response2) {
             console.log(response2);
              } 
         });*/

/*$http.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8;";
$http({url: 'http://10.42.104.61:3000/start',
    method: "POST",
    data: data
}).success(function(data, status, headers, config) {
    console.log(data);
}).error(function(data, status, headers, config) {
    $scope.status = status;
});*/

/*
$http.post('http://10.42.104.61:3000/start',data,{
headers:headers
}).success(function(data, status, headers, config) {
    console.log(data);
  });
  
*/

 

 /*$.ajax({
    'url': 'http://10.42.104.61:3000/start',
    'type': 'POST',
     'data': body,
    'success': function(response2) {
          console.log(response2);
    }
 });*/
};
}]);