$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	if($("#completeQuiz").text()==="Complete Quiz"){
		$("#idTarget").text(sessionStorage.currentQuizId);
		$("#nameTarget").text(sessionStorage.currentQuizName);
	}
	else{
		sessionStorage.setItem("currentQuizId", $("#idTarget").val().trim());
		sessionStorage.setItem("currentQuizName", $("#nameTarget").text());
	}
	$("#item1").on("click", function(){
		sessionStorage.clear();
	})
	$("#completeQuiz").on("click", function(){
		sessionStorage.removeItem("currentQuizName");
		sessionStorage.removeItem("currentQuizId");
	})
})