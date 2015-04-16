app.controller("UserController", ["$scope", "$location", "SocketService","PlayersService", function($scope, $location, SocketService,PlayersService) {
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
    console.log(response);
    }
});


 function showPlayers(players){
  $scope.arr = players;
  $scope.$digest();
 }

 $scope.randomPlayers=function(){
    var nr = [];
    while(nr.length < 4){
    var randomnumber=Math.ceil(Math.random()*$scope.arr.length-1);
    var found=false;
    for(var i=0;i<nr.length;i++){
      if(nr[i]==randomnumber){found=true;break;}
    }
    if(!found)nr[nr.length]=randomnumber;
    }
    PlayersService.setPlayer11($scope.arr[nr[0]]);
    PlayersService.setPlayer12($scope.arr[nr[1]]);
    PlayersService.setPlayer21($scope.arr[nr[2]]);
    PlayersService.setPlayer22($scope.arr[nr[3]]);
    $location.path("/");
 };

 $scope.thisPlayer=function(player){
    console.log("fds");
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