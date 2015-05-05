$(document).ready(function(){
	$(".nav a").on("click", function(){
		console.log("fsfa");
		$(".nav").find(".active").removeClass("active");
		$(this).parent().addClass("active");
	});
});