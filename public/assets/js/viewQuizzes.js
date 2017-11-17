// $(function(){
// 	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
// 	$("#item1").on("click", function(){
// 		sessionStorage.clear();
// 	});
// 	$(".btn-danger").on("click", function(){
// 	  event.preventDefault();
// 	  let quizId = $(this).data("quizid");
// 	  console.log(quizId);
// 	  $.ajax("/api/quiz/" + quizId, {
// 	      type: "delete"
// 	    }).then(
// 	      function() {
// 	        console.log("quiz deleted");
// 	        // Reload the page to get the updated list
// 	        location.reload();
// 	      }
// 	    );
// 	});
// })

$("#addQuestion").on( "click", function() {
    $("#modalQuestionQuizId").val($(this).data("quizid")); 
  });