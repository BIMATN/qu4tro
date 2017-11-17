$(function(){
	if(name){
		sessionStorage.setItem("userName", name);
		sessionStorage.setItem("userId", id);
	}
	else{
		$("#menuWelcome").text("Welcome, "+ sessionStorage.userName);
	};
})