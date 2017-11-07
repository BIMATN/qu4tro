$(function(){
	let name = $("#navbarDropdown").data("username");
	let id = $("#navbarDropdown").data("userid");
	sessionStorage.setItem("userName", name);
	sessionStorage.setItem("userId", id);

	$("#logOut").on("click", function(){
		sessionStorage.clear();
	})
})