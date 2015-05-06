app.controller("WallOfShameController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
$scope.ShameGame = [];
var headers = {
  'Content-Type': 'application/json',
  'dataType':'json',
  'Accept':'application/json',
  'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
};
 $.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/wallOfShame.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
      wall(response);
    }
});
function wall(shame){
	for(var i = 0; i<shame.length; i++){
		var lo1 = shame[i].LOSER1NAME.split(" ");
		var lo2 = shame[i].LOSER2NAME.split(" ");
		var wi1 = shame[i].WINNER1NAME.split(" ");
		var wi2 = shame[i].WINNER2NAME.split(" ");
		shame[i].STARTTIME = shame[i].STARTTIME.split(" ")[0];
		
		if(lo1.length > 2){
			shame[i].LOSER1NAME = lo1[0]+" "+lo1[1];
		}
		else{
			shame[i].LOSER1NAME = lo1[0];
		}
		if(lo2.length > 2){
			shame[i].LOSER2NAME = lo2[0]+" "+lo2[1];
		}
		else{
			shame[i].LOSER2NAME = lo2[0];
		}
		if(wi1.length > 2){
			shame[i].WINNER1NAME = wi1[0]+" "+wi1[1];
		}
		else{
			shame[i].WINNER1NAME = wi1[0];
		}
		if(wi2.length > 2){
			shame[i].WINNER2NAME = wi2[0]+" "+wi2[1];
		}
		else{
			shame[i].WINNER2NAME = wi2[0];
		}

		
	}
	$scope.ShameGame = shame;
	$scope.$digest();
	console.log(shame);
}

$scope.seePlayer = function(playerid){
	$location.path("/Users/"+playerid);
};

}]);

