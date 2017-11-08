$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	$("#item1").on("click", function(){
		sessionStorage.clear();
	})
})