app.controller("UserIDController", ["$scope", "$location", '$routeParams', "SocketService","PlayersService", function($scope, $location, $routeParams, SocketService,PlayersService) {

	$scope.user = {};
	$scope.winp = 0;


	var headers = {
		'Content-Type': 'application/json',
		'dataType':'json',
		'Accept':'application/json',
		'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
	};

	$.ajax({
		'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/userStatistics.xsjs',
		'type': 'GET',
		'dataType': 'json',
		'headers':headers,
		'contentType': 'application/json; charset=utf-8',
		'data' : { id: $routeParams.UserId},
		'success': function(response) {
			console.log(response);
			$scope.user = response;
			$scope.winp = ($scope.user[0].TOTWINS/$scope.user[0].NOGAMES*100).toFixed(2);
			$scope.$digest();
		},
		'error' : function(response) {
			console.log("error : ");
			return response;
		}
	});

	$scope.goToPlayer = function(playerid){
		$location.path("/Users/"+playerid);
	};

}]);