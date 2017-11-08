$(function(){
	$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	$("#logOut").on("click", function(){
		sessionStorage.clear();
	})
})