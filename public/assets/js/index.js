document.addEventListener("DOMContentLoaded", function(){
  // login form
 $("#btn_login").on("click", function(event){

    event.preventDefault();
    $.ajax("/authenticate", {
      type: "GET",
      data: {userName:"charlie@quatro.com", password:"1234"}
    });
  });

  // take quiz form
 $("#btn_takeQuiz").on("click", function(event){
    event.preventDefault();
    
    // Send the GET request.
    $.ajax("/quiz", {
      type: "GET"
    });
  });

});