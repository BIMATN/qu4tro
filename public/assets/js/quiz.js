document.addEventListener("DOMContentLoaded", function(){

	$("input").change(function(){
		var aID = "#answer-" + $(this).attr("data-answer");
			$(aID).show();
	});

});