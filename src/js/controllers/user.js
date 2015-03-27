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

}]);