$(function(){
	let name = $("#navbarDropdown").data("username");
	let id = $("#navbarDropdown").data("userid");
	if(name){
		sessionStorage.setItem("userName", name);
		sessionStorage.setItem("userId", id);
		$("#view").attr("href", "/viewQuizzes/"+id);
	}
	else{
		$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
		$("#view").attr("href", "/viewQuizzes/"+sessionStorage.userId);
	};
	$("#logOut").on("click", function(){
		sessionStorage.clear();
	});
})