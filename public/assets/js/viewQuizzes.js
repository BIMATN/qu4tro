$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	$("#logOut").on("click", function(){
		sessionStorage.clear();
	});
	$(".btn-danger").on("click", function(){
	  event.preventDefault();
	  let quizId = $(this).data("quizid");
	  console.log(quizId);
	  $.ajax("/api/quiz/" + quizId, {
	      type: "delete"
	    }).then(
	      function() {
	        console.log("quiz deleted");
	        // Reload the page to get the updated list
	        location.reload();
	      }
	    );
	});
})