document.addEventListener("DOMContentLoaded", function(){
	// login form
 $("#btn_login").on("click", function(event){
    event.preventDefault();
    alert("login");
  });

	// take quiz form
 $("#btn_takeQuiz").on("click", function(event){
    event.preventDefault();
    
    alert("take quiz");

    var quizData = {
      quizId: $("#quizId").val()
    };

    // Send the GET request.
    $.ajax("/quiz/", {
      type: "GET",
      data: quizData
    });
  });

});