$(function(){
	if(sessionStorage.userName){
		$("#navbarDropdown").text("Welcome, "+sessionStorage.userName);
		$("#logOut").on("click", function(){
			sessionStorage.clear();
		});
	}
	else{
		$("#navbarDropdown").text("Welcome, Guest");
		$(".dropdown-item").text("Register");
		$(".dropdown-item").attr("href", "/register");
	};
})