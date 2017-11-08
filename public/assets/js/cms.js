$(function(){
	let name = $("#navbarDropdown").data("username");
	let id = $("#navbarDropdown").data("userid");
	if(name){
		sessionStorage.setItem("userName", name);
		sessionStorage.setItem("userId", id);
	}
	else{
		$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
	};
	$("#logOut").on("click", function(){
		sessionStorage.clear();
	});
})