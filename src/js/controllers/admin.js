app.controller("adminController", ["$scope", "$http", "$location", "SocketService","PlayersService", function($scope, $http, $location, SocketService,PlayersService) {
    $scope.newName = "";
    $scope.newImagePath = "";

    $scope.addUser = function(newUsername, newImgPath){
      var newUserInfo = {
          "Name":newUsername,
          "ImagePath":newImgPath
      };
      var userInfoString = JSON.stringify(newUserInfo);

      var req  ={
        method: 'POST',
        url: 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/tempUser.xsjs',
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
          console.log("successfully added user");
          $location.path("/");
        }).
        error(function(data, status, headers, config){
          console.log(data);
        });
    };

    /*$('#imgPath').keyup(function() {
      var allowedExtension = ['jpeg', 'jpg'];
      var fileExtension = document.getElementById('imgPath').value.split('.').pop().toLowerCase();
      var isValidFile = false;

      for(var index in allowedExtension) {
        if(fileExtension === allowedExtension[index]) {
          isValidFile = true; 
          break;
        }
      }

      if(isValidFile) {
        return true;
        //$('#displayImage').attr('src', $("#imgPath").value);
      }
      return false;

    });*/




/*
    $scope.addUser = function(newUsername, newImgPath){
    
      var newUserInfo = {
          "Name":newUsername,
          "ImagePath":newImgPath
      };
      var userInfoString = JSON.stringify(newUserInfo);

      var headers = {
          'Content-Type': 'application/json',
          'dataType':'json',
          'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA==',
          'Content-Length': userInfoString.length
      };
      var options = {
          host: 'apprekdbs01.ad.acme.is',
          port: 8000,
          path: '/Fussball_Project/tempUser.xsjs',
          method: 'POST',
          headers: headers
      };
      var req = $http.request(options, function(res) {
          res.setEncoding('utf-8');

          var responseString = '';

          res.on('data', function(data) {
            responseString += data;
          });

          res.on('end', function() {
            var resultObject = JSON.parse(responseString);        
          });
      });

      req.on('error', function(e) {
           console.log("Error : "+e);
      });
      req.write(userInfoString);
      req.end();
    };*/
}]);