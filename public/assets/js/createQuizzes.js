$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	$("#idTarget").text(sessionStorage.userId);
	$("#item1").on("click", function(){
		sessionStorage.clear();
	})
})