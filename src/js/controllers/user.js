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
  var check = false;
  var players2 = [];
  
  for(var i = 0; i<players.length; i++){
    if(PlayersService.getPlayer11() && $location.$$path != "/users"){ 
      if(PlayersService.getPlayer11().UserId == players[i].UserId) 
        check = true;
      }

    if(PlayersService.getPlayer12() && $location.$$path != "/users"){
      if(PlayersService.getPlayer12().UserId == players[i].UserId) 
       check = true;
      }

   if(PlayersService.getPlayer21() && $location.$$path != "/users"){
      if(PlayersService.getPlayer21().UserId == players[i].UserId) 
        check = true;
      }

    if(PlayersService.getPlayer22() && $location.$$path != "/users"){
      if(PlayersService.getPlayer22().UserId == players[i].UserId) 
       check = true;
      }
    if(!check){
      players2.push(players[i]);
    }
    check = false;
  }

  $scope.arr = players2;
  $scope.$digest();
 }

 $scope.thisPlayer=function(player){
  if(!PlayersService.getCurrent()){
    $location.path("/Users/"+player.UserId);
  }
  else {
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
      $location.path("/table");
  }
 };

  //random 4 people selected for teams (for testing)
 //---------------------------------------------
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
    $location.path("/table");
 };

}]);