$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	$("#idTarget").text(sessionStorage.userId);
	$("#logOut").on("click", function(){
		sessionStorage.clear();
	})
})