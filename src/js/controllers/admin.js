app.controller("adminController", ["$scope", "$http", "$location", "SocketService","PlayersService", function($scope, $http, $location, SocketService,PlayersService) {
    $scope.newName = "";
    $scope.newImagePath = "";
    $scope.newPassword = "";
    $scope.newPassword2 = "";
    $scope.errorMessageName = "";
    $scope.errorMessagePassword = "";


    $scope.addUser = function(newUsername, newImgPath, newPassword){
      var allowedExtension = ['jpeg', 'jpg', 'png'];
      var fileExtension = document.getElementById('imgPath').value.split('.').pop().toLowerCase();
      var isValidFile = false;

      if($scope.newName === ''){
        $scope.errorMessageName = "You must enter a valid name";
        return;
      }else{
        $scope.errorMessageName = "";
      }

      if($scope.newPassword === ''){
        $scope.errorMessagePassword = "Your account must have a password";
        return;
      }else{
        $scope.errorMessagePassword = "";
      }

      if($scope.newPassword2 === ''){
        $scope.errorMessagePassword = "You must confirm your password";
        return;
      }else{
        $scope.errorMessagePassword = "";
      }

      if($scope.newPassword !== $scope.newPassword2){
        $scope.errorMessagePassword = "Your passwords do not match";
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

      var newUserInfo = {
          "Name":newUsername,
          "ImagePath":newImgPath,
          "Password":newPassword
      };

      var userInfoString = JSON.stringify(newUserInfo);

      var req = {
        method: 'POST',
        url: 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/tempUser.xsjs',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'dataType':'json',
            'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
        },
        data: userInfoString
      };
      $http(req).
        success(function(newUserId){
          $location.path("/Users/"+newUserId);
        }).
        error(function(data, status, headers, config){
          $scope.errorMessage = data;
        });
    };

}]);