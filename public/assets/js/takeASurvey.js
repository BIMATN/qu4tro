$(function(){
	if(sessionStorage.userName){
		$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
		$("#logOut").on("click", function(){
			sessionStorage.clear();
		});
	}
	else{
		$("#home").attr("href", "/");
		$("#navbarDropdown").text("Welcome, Guest");
		$("#item1").text("Register");
		$("#item1").attr("href", "/register");
		$("#item2").text("Donate");
		$("#item2").attr("href", "https://www.google.com");
	};
})