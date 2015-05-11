app.controller("StatisticsController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {

$scope.moreTop10 = [];
$scope.systemStats = [];

var headers = {
  'Content-Type': 'application/json',
  'dataType':'json',
  'Accept':'application/json',
  'Authorization':'Basic RlVTOlNhbGFzYW5hMTIzNA=='
};

$.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/systemStats.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
    response[0].TOTGAMETIME = parseInt(response[0].TOTGAMETIME/60);
    response[0].TOTGOALS = parseInt(response[0].BLUEGOALS) + parseInt(response[0].BLACKGOALS);
    $scope.systemStats = response;
    //console.log(response);

    }
});
$.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/moreTop10.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
    $scope.moreTop10 = response;
    $scope.$digest();
    }
});

 $.ajax({
    'url': 'http://apprekdbs01.ad.acme.is:8000/Fussball_Project/top10.xsjs',
    'type': 'GET',
    'dataType': 'json',
    'headers':headers,
    'contentType': 'application/json; charset=utf-8',
    'success': function(response) {
    slowGoal(response);
    slowGame(response);
    quickGoal(response);
    quickGame(response);
    eloStat(response);
    comeback(response);
    fastest(response);
    slowest(response);
    }
});
$(document).ready(function(){
    $("#lis1").click(function(){
        $("#l1").show();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();

    });
    $("#lis2").click(function(){
        $("#l1").hide();
        $("#l2").show();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
    $("#lis3").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").show();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
    $("#lis4").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").show();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
    $("#lis5").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").show();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
    $("#lis6").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").show();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
    $("#lis7").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").show();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
     $("#lis8").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").show();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
     $("#lis9").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").show();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
       $("#lis10").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").show();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();

    });
       $("#lis11").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").show();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").hide();
    });
       $("#lis12").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").show();
        $("#l13").hide();
        $("#l14").hide();
    });
      $("#lis13").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").show();
        $("#l14").hide();
    });
       $("#lis14").click(function(){
        $("#l1").hide();
        $("#l2").hide();
        $("#l3").hide();
        $("#l4").hide();
        $("#l5").hide();
        $("#l6").hide();
        $("#l7").hide();
        $("#l8").hide();
        $("#l9").hide();
        $("#l10").hide();
        $("#l11").hide();
        $("#l12").hide();
        $("#l13").hide();
        $("#l14").show();
    });

});
$scope.seePlayer = function(playerid){
	$location.path("/Users/"+playerid);
};
 function secConvert(t)
 {
	if(t>=60)
	{
	min=parseInt(t/60);
	sek = (t%60);
	t= min + "m "+ sek ;
	}
	return t;
 }
 function secConvert1(t)
 {
	if(t>=60)
	{
	min=parseInt(t/60);
	sek = (t%60);
	sek= Math.ceil(sek);
	t= min + "m "+ sek ;
	}
	else
	{
		t= Math.ceil(t);
	}
	return t;
 }
 function slowGoal(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var slowList = {
	user1 : '',
	user2 : '',
	diffsec : 0,
	user1Id : 0,
	user2Id : 0,
	user1Img : '',
	user2Img : '',
	date: ''
	};
	var t = '';
	if(stats[i].SLOWESTGOALTEAMID == 1){
	slowList.user1 = stats[i].SLOWESTGOALT1U1NAME;
	slowList.user2 = stats[i].SLOWESTGOALT1U2NAME;
	t = stats[i].SLOWESTGOALDIFF_SEC;
	slowList.user1Id = stats[i].SLOWESTGOALT1U1ID;
	slowList.user2Id = stats[i].SLOWESTGOALT1U1ID;
	slowList.user1Img = stats[i].SLOWESTGOALT1U1IMAGEPATH;
	slowList.user2Img = stats[i].SLOWESTGOALT1U2IMAGEPATH;
	}
	else{
	slowList.user1 = stats[i].SLOWESTGOALT2U1NAME;
	slowList.user2 = stats[i].SLOWESTGOALT2U2NAME;
	t = stats[i].SLOWESTGOALDIFF_SEC;
	slowList.user1Id = stats[i].SLOWESTGOALT2U1ID;
	slowList.user2Id = stats[i].SLOWESTGOALT2U1ID;
	slowList.user1Img = stats[i].SLOWESTGOALT2U1IMAGEPATH;
	slowList.user2Img = stats[i].SLOWESTGOALT2U2IMAGEPATH;
	}
	slowList.diffsec=secConvert(t);
	slowList.date = stats[i].SLOWESTGOALTIMEOFGOAL;
	list.push(slowList);
  }
  $scope.slowgoalarr = list;
  $scope.$digest();
 }
 function slowGame(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	user2 : '',
	user3 : '',
	user4 : '',
	diffsec : 0,
	user1Id : 0,
	user2Id : 0,
	user3Id : 0,
	user4Id : 0,
	user1Img : '',
	user2Img : '',
	user3Img : '',
	user4Img : ''
	};
	var t = '';
	var min =0;
	var sek =0;
	if ((stats[i].SLOWESTGAMEWINNINGTEAM) ==1) 
	{
		lis.user1 = stats[i].SLOWESTGAMET1U1NAME;
		lis.user2 = stats[i].SLOWESTGAMET1U2NAME;
		lis.user3 = stats[i].SLOWESTGAMET2U1NAME;
		lis.user4 = stats[i].SLOWESTGAMET2U2NAME;
		lis.user1Id = stats[i].SLOWESTGAMET1U1;
		lis.user2Id = stats[i].SLOWESTGAMET1U2;
		lis.user3Id = stats[i].SLOWESTGAMET2U1;
		lis.user4Id = stats[i].SLOWESTGAMET2U2;
		lis.user1Img = stats[i].SLOWESTGAMET1U1IMAGEPATH;
		lis.user2Img = stats[i].SLOWESTGAMET1U2IMAGEPATH;
		lis.user3Img = stats[i].SLOWESTGAMET2U1IMAGEPATH;
		lis.user4Img = stats[i].SLOWESTGAMET2U2IMAGEPATH;
	}
	else
	{
		lis.user1 = stats[i].SLOWESTGAMET2U1NAME;
		lis.user2 = stats[i].SLOWESTGAMET2U2NAME;
		lis.user3 = stats[i].SLOWESTGAMET1U1NAME;
		lis.user4 = stats[i].SLOWESTGAMET1U2NAME;
		lis.user1Id = stats[i].SLOWESTGAMET2U1;
		lis.user2Id = stats[i].SLOWESTGAMET2U2;
		lis.user3Id = stats[i].SLOWESTGAMET1U1;
		lis.user4Id = stats[i].SLOWESTGAMET1U2;
		lis.user1Img = stats[i].SLOWESTGAMET2U1IMAGEPATH;
		lis.user2Img = stats[i].SLOWESTGAMET2U2IMAGEPATH;
		lis.user3Img = stats[i].SLOWESTGAMET1U1IMAGEPATH;
		lis.user4Img = stats[i].SLOWESTGAMET1U2IMAGEPATH;
	}
	t = stats[i].SLOWESTGAMELENGTH;
	lis.diffsec=secConvert(t);
	list.push(lis);
  }
  $scope.slowgamearr = list;
  $scope.$digest();
 }
 function quickGoal(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var quickList = {
	user1 : '',
	user2 : '',
	diffsec : 0,
	user1Id : 0,
	user2Id : 0,
	user1Img : '',
	user2Img : '',
	date: '', 
	};
	var t ='';
	if(stats[i].QUICKESTGOALTEAMID == 1){
	quickList.user1 = stats[i].QUICKESTGOALT1U1NAME;
	quickList.user2 = stats[i].QUICKESTGOALT1U2NAME;
	quickList.user1Id = stats[i].QUICKESTGOALT1U1ID;
	quickList.user2Id = stats[i].QUICKESTGOALT1U1ID;
	quickList.user1Img = stats[i].QUICKESTGOALT1U1IMAGEPATH;
	quickList.user2Img = stats[i].QUICKESTGOALT1U2IMAGEPATH;
	}
	else{
	quickList.user1 = stats[i].QUICKESTGOALT2U1NAME;
	quickList.user2 = stats[i].QUICKESTGOALT2U2NAME;
	quickList.user1Id = stats[i].QUICKESTGOALT2U1ID;
	quickList.user2Id = stats[i].QUICKESTGOALT2U1ID;
	quickList.user1Img = stats[i].QUICKESTGOALT2U1IMAGEPATH;
	quickList.user2Img = stats[i].QUICKESTGOALT2U2IMAGEPATH;
	}
	quickList.date = stats[i].QUICKESTGOALTIMEOFGOAL;
	t = stats[i].QUICKESTGOALDIFF_SEC;
	quickList.diffsec=secConvert(t);
	list.push(quickList);
  }
  $scope.quickgoalarr = list;
  $scope.$digest();
 }
 function quickGame(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	user2 : '',
	user3 : '',
	user4 : '',
	diffsec : 0,
	user1Id : 0,
	user2Id : 0,
	user3Id : 0,
	user4Id : 0,
	user1Img : '',
	user2Img : '',
	user3Img : '',
	user4Img : ''
	};
	var t = '';
	var min =0;
	var sek =0;
	if ((stats[i].QUICKESTGAMEWINNINGTEAM) ==1) 
	{
		lis.user1 = stats[i].QUICKESTGAMET1U1NAME;
		lis.user2 = stats[i].QUICKESTGAMET1U2NAME;
		lis.user3 = stats[i].QUICKESTGAMET2U1NAME;
		lis.user4 = stats[i].QUICKESTGAMET2U2NAME;
		lis.user1Id = stats[i].QUICKESTGAMET1U1;
		lis.user2Id = stats[i].QUICKESTGAMET1U2;
		lis.user3Id = stats[i].QUICKESTGAMET2U1;
		lis.user4Id = stats[i].QUICKESTGAMET2U2;
		lis.user1Img = stats[i].QUICKESTGAMET1U1IMAGEPATH;
		lis.user2Img = stats[i].QUICKESTGAMET1U2IMAGEPATH;
		lis.user3Img = stats[i].QUICKESTGAMET2U1IMAGEPATH;
		lis.user4Img = stats[i].QUICKESTGAMET2U2IMAGEPATH;
	}
	else
	{
		lis.user1 = stats[i].QUICKESTGAMET2U1NAME;
		lis.user2 = stats[i].QUICKESTGAMET2U2NAME;
		lis.user3 = stats[i].QUICKESTGAMET1U1NAME;
		lis.user4 = stats[i].QUICKESTGAMET1U2NAME;
		lis.user1Id = stats[i].QUICKESTGAMET2U1;
		lis.user2Id = stats[i].QUICKESTGAMET2U2;
		lis.user3Id = stats[i].QUICKESTGAMET1U1;
		lis.user4Id = stats[i].QUICKESTGAMET1U2;
		lis.user1Img = stats[i].QUICKESTGAMET2U1IMAGEPATH;
		lis.user2Img = stats[i].QUICKESTGAMET2U2IMAGEPATH;
		lis.user3Img = stats[i].QUICKESTGAMET1U1IMAGEPATH;
		lis.user4Img = stats[i].QUICKESTGAMET1U2IMAGEPATH;
	}
	t = stats[i].QUICKESTGAMELENGTH;
	lis.diffsec=secConvert(t);
	list.push(lis);
  }
  $scope.quickgamearr = list;
  $scope.$digest();
 }
 function eloStat(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	elo : 0,
	user1Id : 0,
	user1Img : ''
	};
	
	lis.user1 = stats[i].TOPELONAME;
	lis.elo = stats[i].TOPELOSCORE;
	lis.user1Id = stats[i].TOPELOID;
	lis.user1Img = stats[i].TOPELOIMAGEPATH;

	list.push(lis);
  }
  $scope.eloarr = list;
  $scope.$digest();
 }
var classHighlight = 'highlight';
var $thumbs = $('.thumbnail').click(function(e) {
    e.preventDefault();
    $thumbs.removeClass(classHighlight);
    $(this).addClass(classHighlight);
});
function comeback(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	user2 : '',
	user3 : '',
	user4 : '',
	deficit : 0,
	user1Id : 0,
	user2Id : 0,
	user3Id : 0,
	user4Id : 0,
	user1Img : '',
	user2Img : '',
	user3Img : '',
	user4Img : ''
	};
	if(stats[i].COMEBACKT1U1ID !== null){
        if ((stats[i].COMEBACKWINNING_TEAM) ==1) 
        {
            lis.user1 = stats[i].COMEBACKT1U1NAME;
            lis.user2 = stats[i].COMEBACKT1U2NAME;
            lis.user3 = stats[i].COMEBACKT2U1NAME;
            lis.user4 = stats[i].COMEBACKT2U2NAME;
            lis.user1Id = stats[i].COMEBACKT1U1ID;
            lis.user2Id = stats[i].COMEBACKT1U2ID;
            lis.user3Id = stats[i].COMEBACKT2U1ID;
            lis.user4Id = stats[i].COMEBACKT2U2ID;
            lis.user1Img = stats[i].COMEBACKT1U1IMAGEPATH;
            lis.user2Img = stats[i].COMEBACKT1U2IMAGEPATH;
            lis.user3Img = stats[i].COMEBACKT2U1IMAGEPATH;
            lis.user4Img = stats[i].COMEBACKT2U2IMAGEPATH;
        }
        else
        {
            lis.user1 = stats[i].COMEBACKT2U1NAME;
            lis.user2 = stats[i].COMEBACKT2U2NAME;
            lis.user3 = stats[i].COMEBACKT1U1NAME;
            lis.user4 = stats[i].COMEBACKT1U2NAME;
            lis.user1Id = stats[i].COMEBACKT2U1;
            lis.user2Id = stats[i].COMEBACKT2U2;
            lis.user3Id = stats[i].COMEBACKT1U1;
            lis.user4Id = stats[i].COMEBACKT1U2;
            lis.user1Img = stats[i].COMEBACKT2U1IMAGEPATH;
            lis.user2Img = stats[i].COMEBACKT2U2IMAGEPATH;
            lis.user3Img = stats[i].COMEBACKT1U1IMAGEPATH;
            lis.user4Img = stats[i].COMEBACKT1U2IMAGEPATH;
        }
        lis.deficit = stats[i].COMEBACKMAX_DEFICIT;
        list.push(lis);
    }
  }
  $scope.comebackarr = list;
  $scope.$digest();
 }
 function fastest(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	avgtime : 0,
	user1Id : 0,
	user1Img : ''
	};
	
	lis.user1 = stats[i].FASTESTPLAYERNAME;
	var t = stats[i].FASTESTPLAYERAVGTIME;
	lis.user1Id = stats[i].FASTESTPLAYERID;
	lis.user1Img = stats[i].FASTESTPLAYERIMAGEPATH;
	t= secConvert1(t);
	lis.avgtime = t;
	list.push(lis);
  }
  $scope.fastestarr = list;
  $scope.$digest();
 }
 function slowest(stats){
  var list = [];
  for(var i = 0; i<stats.length; i++){

	var lis = {
	user1 : '',
	avgtime : 0,
	user1Id : 0,
	user1Img : ''
	};
	
	lis.user1 = stats[i].SLOWESTPLAYERNAME;
	var t = stats[i].SLOWESTPLAYERAVGTIME;
	lis.user1Id = stats[i].SLOWESTPLAYERID;
	lis.user1Img = stats[i].SLOWESTPLAYERIMAGEPATH;
	t= secConvert1(t);
	lis.avgtime = t;
	list.push(lis);
  }
  $scope.slowestarr = list;
  $scope.$digest();
 }
}]);

