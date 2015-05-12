app.controller("UserIDController", ["$scope", "$http", "$location", '$routeParams', "SocketService","PlayersService",  function($scope, $http, $location, $routeParams, SocketService,PlayersService) {

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
    $scope.avgPlayingTimeError = "";
    $scope.gameHistory = [];


  var headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'dataType':'json',
    'Accept': 'application/json; charset=utf-8',
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
            $scope.noGamesPlayedError = "You have to play at least 1 game to get a ranking";
            $scope.avgPlayingTimeError = "No games played";
            $scope.newName = $scope.user[0].NAME;
            $scope.newImagePath = $scope.user[0].IMAGEPATH;
            $scope.$digest();
          },
          'error': function(err){
            console.log("error: " + err);
          }
        });
      }
      else{
        $scope.user = response;
        $scope.winp = ($scope.user[0].TOTWINS/$scope.user[0].NOGAMES*100).toFixed(2);
        $scope.newName = $scope.user[0].NAME;
        $scope.newImagePath = $scope.user[0].IMAGEPATH;
        $scope.newPassword = "";
        $scope.user[0].AVGPLAYINGTIME = (parseInt($scope.user[0].AVGPLAYINGTIME)/60);
        $(".noGamesPlayed").show();
        $scope.$digest();
        historyArr = [];

        $.ajax({
          'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/gameHistory.xsjs',
          'type': 'GET',
          'dataType': 'json',
          'headers':headers,
          'contentType': 'application/json; charset=utf-8',
          'data' : { id: $routeParams.UserId },
          'success': function(response) {

            for(var i = 0; i<response.length; i++){
              historyObj = {
                "t1u1id":0,
                "t1u1name":'',
                "t1u1image":'',
                "t1u2id":0,
                "t1u2name":'',
                "t1u2image":'',
                "t2u1id":0,
                "t2u1name":'',
                "t2u1image":'',
                "t2u2id":0,
                "t2u2name":'',
                "t2u2image":'',
                "scoreteam1":0,
                "scoreteam2":0,
                "starttime":''
              };
              if(response[i].WINNER1 == response[i].TEAM1USER1ID){
                historyObj.t1u1id = response[i].WINNER1;
                historyObj.t1u1name = response[i].WINNER1NAME;
                historyObj.t1u1image = response[i].WINNER1IMAGEPATH;

                historyObj.t1u2id = response[i].WINNER2;
                historyObj.t1u2name = response[i].WINNER2NAME;
                historyObj.t1u2image = response[i].WINNER2IMAGEPATH;

                historyObj.t2u1id = response[i].LOSER1;
                historyObj.t2u1name = response[i].LOSER1NAME;
                historyObj.t2u1image = response[i].LOSER1IMAGEPATH;

                historyObj.t2u2id = response[i].LOSER2;
                historyObj.t2u2name = response[i].LOSER2NAME;
                historyObj.t2u2image = response[i].LOSER2IMAGEPATH;


              }
              else{
                historyObj.t1u1id = response[i].LOSER1;
                historyObj.t1u1name = response[i].LOSER1NAME;
                historyObj.t1u1image = response[i].LOSER1IMAGEPATH;

                historyObj.t1u2id = response[i].LOSER2;
                historyObj.t1u2name = response[i].LOSER2NAME;
                historyObj.t1u2image = response[i].LOSER2IMAGEPATH;

                historyObj.t2u1id = response[i].WINNER1;
                historyObj.t2u1name = response[i].WINNER1NAME;
                historyObj.t2u1image = response[i].WINNER1IMAGEPATH;

                historyObj.t2u2id = response[i].WINNER2;
                historyObj.t2u2name = response[i].WINNER2NAME;
                historyObj.t2u2image = response[i].WINNER2IMAGEPATH;
              }
              historyObj.scoreteam1 = response[i].SCORETEAM1;
              historyObj.scoreteam2 = response[i].SCORETEAM2;
              historyObj.starttime = response[i].STARTTIME.split(" ")[0];
              historyArr.push(historyObj);
            }
            $scope.gameHistory = historyArr;
            $scope.$digest();
          }
        });
      }
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
        contentType : 'application/json; charset=utf-8',
        headers: headers,
        data: userInfoString
      };
      $http(req).
        success(function(){
          $location.path("/Users/"+$scope.user[0].USERID);
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
        headers: headers,
        data: userInfoString
      };
      $http(req).
        success(function(){
          $location.path("/Users/"+$scope.user[0].USERID);
        }).
        error(function(data, status, headers, config){
          $scope.errorMessagePassword = "Wrong password";
        });
    };
}]);