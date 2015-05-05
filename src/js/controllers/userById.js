app.controller("UserIDController", ["$scope", "$http", "$location", '$routeParams', "SocketService","PlayersService", function($scope, $http, $location, $routeParams, SocketService,PlayersService) {

	$scope.user = {};
	$scope.winp = 0;
	$scope.newName = "";
    $scope.newImagePath = "";
    $scope.password = "";
    $scope.newPassword = "";
    $scope.newPassword2 = "";
    $scope.errorMessagePassword = "";
    $scope.errorMessageName = "";
    $scope.noGamesPlayedError = "";

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
			if(response.length <= 0){
				$.ajax({
					'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/userById.xsjs',
					'type': 'GET',
					'dataType': 'json',
					'headers':headers,
					'contentType': 'application/json; charset=utf-8',
					'data' : { id: $routeParams.UserId},
					'success': function(resp) {
						$scope.user = resp;
						$scope.user[0].NOGAMES = 0;
						$scope.noGamesPlayedError = "You have to play at least 5 game to get a ranking";
						$scope.newName = $scope.user[0].NAME;
						$scope.newImagePath = $scope.user[0].IMAGEPATH;
						$scope.$digest();
						console.log(resp);
					},
					'error': function(err){
						console.log("error: " + err);
					}
				});
			}else{
				console.log("haffis response: " + response);
				$scope.user = response;
				$scope.winp = ($scope.user[0].TOTWINS/$scope.user[0].NOGAMES*100).toFixed(2);
				$scope.newName = $scope.user[0].NAME;
				$scope.newImagePath = $scope.user[0].IMAGEPATH;
				$scope.newPassword = "";
				$scope.$digest();}
		},
		'error' : function(response) {
			console.log("error : ");
			return response;
		}
	});


	$scope.goToPlayer = function(playerid){
		$location.path("/Users/"+playerid);
	};

	$scope.editUser = function(){
      $location.path("/editUser/" + $scope.user[0].USERID);
    };

    $scope.changePassword = function(){
      $location.path("changePassword/" + $scope.user[0].USERID);
    };

    $scope.saveNewPassword = function(oldPassword, newPassword){
      if($scope.newPassword !== $scope.newPassword2){
        $scope.errorMessagePassword = "New password fields do not match";
        return;
      }

      var newUserInfo = {
		"UserId":$scope.user[0].USERID,
		"Password":oldPassword,
		"NewPassword":newPassword
      };

      var userInfoString = JSON.stringify(newUserInfo);

      var req = {
        method: 'POST',
        url: 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/changePassword.xsjs',
        headers: {
            'Content-Type': 'application/json',
            'dataType':'json',
            'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
            //'Content-Length': userInfoString.length
        },
        data: userInfoString
      };
      console.log(newUserInfo);
      $http(req).
        success(function(){
          console.log("successfully changed password");
          $location.path("/users");
        }).
        error(function(data, status, headers, config){
          $scope.errorMessagePassword = "Wrong password";
        });
    };

    $scope.saveChanges = function(newUsername, newImgPath, password){
      var allowedExtension = ['jpeg', 'jpg', 'png'];
      var fileExtension = document.getElementById('imgPath').value.split('.').pop().toLowerCase();
      var isValidFile = false;

      if($scope.newName === ''){
        $scope.errorMessageName = "You must have a valid name";
        return;
      }else{
        $scope.errorMessageName = "";
      }

      if($scope.password === ''){
        $scope.errorMessagePassword = "Please enter your password";
        return;
      }else{
        $scope.errorMessagePassword = "";
      }


      for(var index in allowedExtension) {
        if(fileExtension === allowedExtension[index]) {
          isValidFile = true; 
          break;
        }
      }

      if(!isValidFile) {
        newImgPath = "";
      }

      if($scope.newName === ""){
		newUsername = $scope.user[0].NAME;
      }

      var newUserInfo = {
		"UserId":$scope.user[0].USERID,
		"Name":newUsername,
		"ImagePath":newImgPath,
		"Password":password
      };

      var userInfoString = JSON.stringify(newUserInfo);

      var req = {
        method: 'POST',
        url: 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/updateUser.xsjs',
        headers: {
            'Content-Type': 'application/json',
            'dataType':'json',
            'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
            //'Content-Length': userInfoString.length
        },
        data: userInfoString
      };
      console.log(newUserInfo);
      $http(req).
        success(function(){
          console.log("successfully updated user");
          $location.path("/users");
        }).
        error(function(data, status, headers, config){
          $scope.errorMessagePassword = "Wrong password";
        });
    };

}]);